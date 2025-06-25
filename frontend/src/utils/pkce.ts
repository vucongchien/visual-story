// Mục đích: Tạo một cặp khóa bí mật cho phiên đăng nhập này. code_verifier là bí mật gốc, code_challenge là phiên bản đã được mã hóa của nó.
// Tóm tắt: Viết các hàm trợ giúp để tạo một chuỗi ngẫu nhiên (verifier) và sau đó băm nó bằng SHA-256 để tạo ra challenge.

function generateRandomString(length: number) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  let text = '';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// Hàm băm chuỗi bằng SHA-256
async function sha256(plain: string | undefined) {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
}

// Hàm mã hóa Base64URL
function base64urlencode(a: ArrayBuffer) {
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(a)]))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

// Hàm chính để tạo cặp khóa PKCE
export async function generatePkceChallenge() {
  const verifier = generateRandomString(128); 
  const hashed = await sha256(verifier); 
  const challenge = base64urlencode(hashed); 

  return { verifier, challenge };
}