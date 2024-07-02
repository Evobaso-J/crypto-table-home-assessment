type APIResponse = {
  data: unknown
  status: unknown
}

export type ParseFunction<TInternal, TResponse extends APIResponse> =
TResponse extends undefined ? undefined : (data: TResponse) => TInternal[]
