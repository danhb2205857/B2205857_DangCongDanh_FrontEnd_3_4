import createApiClient from "./api.service";

class ContactService {
  constructor(baseUrl = "/api/contacts") {
    this.api = createApiClient(baseUrl);
  }
  async getAll() {
    const response = await this.api.get("/");
    return response.data.data; // Lấy data.data vì backend trả về {data: [...]}
  }
  async create(data) {
    const response = await this.api.post("/", data);
    return response.data.data;
  }
  async deleteAll() {
    const response = await this.api.delete("/");
    return response.data;
  }
  async get(id) {
    const response = await this.api.get(`/${id}`);
    return response.data.data;
  }
  async update(id, data) {
    const response = await this.api.put(`/${id}`, data);
    return response.data.data;
  }
  async delete(id) {
    const response = await this.api.delete(`/${id}`);
    return response.data;
  }
}

export default new ContactService();
