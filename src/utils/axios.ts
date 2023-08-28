// 导入包
import { signature } from '@/wusuan-api-sign/wusuan_api_sign';

// 时间戳，字符串格式
const timestamp = "1501640900";
// 随机数，最好使用UUID，字符串格式
const nonce = "5d7db9ef-6451-47ac-8c40-6brg7df4b7ec";
// api_signature 就是计算后的签名，字符串格式
const api_signature = signature(timestamp, nonce);

export default api_signature
