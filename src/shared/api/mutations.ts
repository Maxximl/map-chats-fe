import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query'

type ApiError = {
  message: string
  statusCode: number
  errors?: Record<string, string[]>
}

export type ApiMutationOptions<TData, TVariables> = {
  mutationFn?: (variables: TVariables) => Promise<TData>
  onSuccess?: (data: TData, variables: TVariables) => void
  onError?: (error: ApiError, variables: TVariables) => void
  onSettled?: (data: TData | undefined, error: ApiError | null, variables: TVariables) => void
  successMessage?: string
  errorMessage?: string
} & Omit<UseMutationOptions<TData, ApiError, TVariables>, 'mutationFn'>

export const useApiMutation = <TData = unknown, TVariables = void>(
  options: ApiMutationOptions<TData, TVariables>
): UseMutationResult<TData, ApiError, TVariables> & {
  isError: boolean
  error: ApiError | null
} => {
  const mutation = useMutation<TData, ApiError, TVariables>({
    ...options,
    mutationFn: options.mutationFn,
  })

  return mutation
}
