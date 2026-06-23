const FILE_SIGNATURES: Record<string, { bytes: number[]; offset?: number }[]> = {
  'image/jpeg': [{ bytes: [0xff, 0xd8, 0xff] }],
  'image/png': [{ bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a] }],
  'image/gif': [{ bytes: [0x47, 0x49, 0x46, 0x38] }],
  'image/webp': [{ bytes: [0x52, 0x49, 0x46, 0x46] }],
  'application/pdf': [{ bytes: [0x25, 0x50, 0x44, 0x46] }],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    { bytes: [0x50, 0x4b, 0x03, 0x04] },
  ],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
    { bytes: [0x50, 0x4b, 0x03, 0x04] },
  ],
}

export function validateFileContent(
  buffer: Buffer,
  declaredMime: string,
): boolean {
  const signatures = FILE_SIGNATURES[declaredMime]
  if (!signatures) return false

  return signatures.some((sig) => {
    const offset = sig.offset ?? 0
    return sig.bytes.every((byte, index) => buffer[offset + index] === byte)
  })
}

export function validateFileSize(size: number, maxSizeBytes: number): boolean {
  return size > 0 && size <= maxSizeBytes
}

export const MAX_FILE_SIZES = {
  photo: 500 * 1024,
  signature: 200 * 1024,
  marksheet: 5 * 1024 * 1024,
  general: 50 * 1024 * 1024,
} as const
