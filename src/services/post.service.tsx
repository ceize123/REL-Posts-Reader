import http from '../http-common';
import { Posts, Post } from '../types'

class PostDataService {
  getAll() {
    return http.get<Array<Posts>>('/posts');
  }

  getComment(id: string | any) {
    return http.get<Array<Post>>(`/posts/${id}/comments`);
  }
}

export default new PostDataService();