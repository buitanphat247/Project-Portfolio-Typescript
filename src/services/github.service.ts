import axios from 'axios';
import type { GitHubRepo } from '../types/github.types';
import { config } from '../utils/config';

const GITHUB_API_URL = 'https://api.github.com/user/repos';

export const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  try {
    console.log('🔍 Đang fetch repositories từ GitHub...');
    
                    const response = await axios.get(GITHUB_API_URL, {
                  headers: {
                    'Authorization': `token ${config.github.token}`,
                    'Accept': 'application/vnd.github.v3+json'
                  },
      params: {
        sort: 'updated',
        per_page: 100,
        type: 'public'
      }
    });
    
    console.log('response: ', response);
    
    const data: GitHubRepo[] = response.data;
    console.log('📊 Tổng repositories nhận được:', data.length);
    console.log('📋 Danh sách repositories:', data.map(repo => repo.name));
    
    // Không lọc gì cả - hiển thị tất cả repositories
    console.log('✅ Không lọc - giữ nguyên tất cả repositories:', data.length);
    
    // Sắp xếp theo ngày cập nhật mới nhất
    const sortedRepos = data.sort((a, b) => 
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
    
    console.log('🎯 Đã sắp xếp repositories:', sortedRepos.length);
    
    return sortedRepos;
    
  } catch (err) {
    console.error('❌ Lỗi khi fetch repositories:', err);
    
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        throw new Error('Token không hợp lệ hoặc đã hết hạn');
      } else if (err.response?.status === 403) {
        throw new Error('Không có quyền truy cập repositories');
      } else {
        throw new Error(`GitHub API Error: ${err.response?.status} ${err.response?.statusText}`);
      }
    } else {
      throw new Error('Có lỗi xảy ra khi kết nối với GitHub');
    }
  }
};
