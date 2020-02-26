import {ResolvedFn, RejectedFn} from '../types'

interface Interceptor<T> {
  resolved: ResolvedFn<T>
  rejected?: RejectedFn
}

export default class InterceptorManager<T> {
  private interceptros: Array<Interceptor<T> | null>
  constructor() {
    this.interceptros = []
  }

  use(resolved: ResolvedFn, rejected?: RejectedFn): number {
    this.interceptros.push({resolved, rejected})
    return this.interceptros.length - 1
  }

  eject(id: number) {
    if (this.interceptros[id]) {
      this.interceptros[id] = null
    }
  }

  forEach(fn: (Interceptor: Interceptor<T>) => void): void {
    this.interceptros.forEach((interceptor) => {
      if (interceptor !== null) {
        fn(interceptor)
      }
    })
  }
}
