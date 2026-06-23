export function sanitizeText(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export function sanitizeEmail(input: string): string {
  return input.toLowerCase().trim()
}

export function sanitizePhone(input: string): string {
  return input.replace(/\D/g, '')
}

const MAGIC_BYTES: Record<string, number[]> = {
  'application/pdf': [0x25, 0x50, 0x44, 0x46],
  'image/jpeg': [0xff, 0xd8, 0xff],
  'image/png': [0x89, 0x50, 0x4e, 0x47],
  'image/gif': [0x47, 0x49, 0x46],
  'image/webp': [0x52, 0x49, 0x46, 0x46],
}

export function verifyMimeType(buffer: Buffer, allowedMimes: string[]): boolean {
  for (const mime of allowedMimes) {
    const signature = MAGIC_BYTES[mime]
    if (!signature) continue

    const matches = signature.every((byte, index) => buffer[index] === byte)
    if (matches) return true
  }
  return false
}
