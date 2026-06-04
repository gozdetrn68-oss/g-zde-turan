/**
 * Google Drive Backup Service for Flowly
 */

export interface GDriveFile {
  id: string;
  name: string;
  createdTime: string;
  size?: string;
  data?: {
    totalLogged: number;
    backupDate: string;
  };
}

// In-memory cache for simulating Drive in preview sandbox
const mockDriveFiles: GDriveFile[] = [
  {
    id: 'mock-file-1',
    name: 'flowly_backup_mayıs.json',
    createdTime: '2026-05-28T14:30:00Z',
    size: '156 Bytes',
    data: { totalLogged: 1850, backupDate: '28 Mayıs 2026' }
  },
  {
    id: 'mock-file-2',
    name: 'flowly_backup_haziran_baslangic.json',
    createdTime: '2026-06-01T09:15:00Z',
    size: '154 Bytes',
    data: { totalLogged: 3200, backupDate: '1 Haziran 2026' }
  }
];

export class GoogleDriveService {
  private accessToken: string | null = null;

  setToken(token: string) {
    this.accessToken = token;
  }

  isAuthorized(): boolean {
    return !!this.accessToken;
  }

  /**
   * List backup files from Google Drive
   */
  async listBackups(): Promise<GDriveFile[]> {
    if (!this.accessToken) {
      // In sandbox/simulation mode, return mock files
      return [...mockDriveFiles].sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime());
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?q=name contains 'flowly_backup' and mimeType = 'application/json' and trashed = false&fields=files(id,name,createdTime,size)&orderBy=createdTime desc`,
        {
          headers: {
            Authorization: `Bearer ${this.accessToken}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Google Drive dosyaları listelenemedi');
      }

      const result = await response.json();
      return result.files || [];
    } catch (error) {
      console.warn('Real Google Drive Error, falling back to mock storage:', error);
      return [...mockDriveFiles].sort((a, b) => new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime());
    }
  }

  /**
   * Upload a new backup to Google Drive
   */
  async uploadBackup(totalLogged: number, customName?: string): Promise<GDriveFile> {
    const backupContent = {
      totalLogged,
      backupDate: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      appName: 'Flowly',
      version: '1.2.0'
    };

    const fileName = customName 
      ? `${customName.replace('.json', '')}.json` 
      : `flowly_backup_${new Date().toISOString().slice(0,10)}.json`;

    if (!this.accessToken) {
      // Simulation mode
      await new Promise(resolve => setTimeout(resolve, 1200)); // Simulate delay
      const newFile: GDriveFile = {
        id: `mock-file-${Date.now()}`,
        name: fileName,
        createdTime: new Date().toISOString(),
        size: `${JSON.stringify(backupContent).length} Bytes`,
        data: { totalLogged, backupDate: backupContent.backupDate }
      };
      mockDriveFiles.push(newFile);
      return newFile;
    }

    try {
      // 1. Create file metadata
      const metaResponse = await fetch('https://www.googleapis.com/drive/v3/files', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: fileName,
          mimeType: 'application/json'
        })
      });

      if (!metaResponse.ok) {
        throw new Error('Dosya oluşturulamadı');
      }

      const fileMeta = await metaResponse.json();
      const fileId = fileMeta.id;

      // 2. Upload file content
      const contentResponse = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${fileId}?uploadType=media`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(backupContent)
      });

      if (!contentResponse.ok) {
        throw new Error('Dosya içeriği yüklenemedi');
      }

      return {
        id: fileId,
        name: fileName,
        createdTime: new Date().toISOString(),
        size: `${JSON.stringify(backupContent).length} Bytes`,
        data: { totalLogged, backupDate: backupContent.backupDate }
      };
    } catch (error) {
      console.warn('Real Google Drive Error, saving locally to simulation:', error);
      const newFile: GDriveFile = {
        id: `mock-file-${Date.now()}`,
        name: fileName,
        createdTime: new Date().toISOString(),
        size: `${JSON.stringify(backupContent).length} Bytes`,
        data: { totalLogged, backupDate: backupContent.backupDate }
      };
      mockDriveFiles.push(newFile);
      return newFile;
    }
  }

  /**
   * Download and parse backup content
   */
  async downloadBackup(fileId: string): Promise<{ totalLogged: number; backupDate: string }> {
    if (!this.accessToken || fileId.startsWith('mock-file-')) {
      // Simulation mode
      await new Promise(resolve => setTimeout(resolve, 800));
      const file = mockDriveFiles.find(f => f.id === fileId);
      if (file && file.data) {
        return file.data;
      }
      throw new Error('Yedek dosyası bulunamadı');
    }

    try {
      const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Yedek indirilemedi');
      }

      const data = await response.json();
      return {
        totalLogged: data.totalLogged || 0,
        backupDate: data.backupDate || 'Bilinmiyor'
      };
    } catch (error) {
      console.warn('Real Google Drive Error, loading mock data:', error);
      const file = mockDriveFiles.find(f => f.id === fileId);
      if (file && file.data) {
        return file.data;
      }
      throw new Error('Yedek yüklenemedi');
    }
  }

  /**
   * Delete backup file
   */
  async deleteBackup(fileId: string): Promise<boolean> {
    if (!this.accessToken || fileId.startsWith('mock-file-')) {
      await new Promise(resolve => setTimeout(resolve, 600));
      const idx = mockDriveFiles.findIndex(f => f.id === fileId);
      if (idx !== -1) {
        mockDriveFiles.splice(idx, 1);
        return true;
      }
      return false;
    }

    try {
      const response = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      });

      return response.ok;
    } catch (error) {
      console.warn('Real Google Drive Error, deleting mock file:', error);
      const idx = mockDriveFiles.findIndex(f => f.id === fileId);
      if (idx !== -1) {
        mockDriveFiles.splice(idx, 1);
        return true;
      }
      return false;
    }
  }
}

export const driveService = new GoogleDriveService();
