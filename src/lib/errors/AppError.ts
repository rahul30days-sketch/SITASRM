export class AppError extends Error {
  constructor(
    public override message: string,
    public statusCode: number,
    public isPublic: boolean = false,
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export function handleApiError(error: unknown): Response {
  if (error instanceof AppError && error.isPublic) {
    return Response.json({ error: error.message }, { status: error.statusCode })
  }
  console.error('[API Error]:', error)
  return Response.json({ error: 'Something went wrong' }, { status: 500 })
}
