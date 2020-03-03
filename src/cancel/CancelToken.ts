import {CancelExecutor, CancelTokenSource, Canceler } from '../types'
import Cancel from './Cancel'

interface ResolvePromise {
  (reason?: Cancel): void
}

export default class CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel
  constructor (executor: CancelExecutor) {
    let resolvepromise: ResolvePromise
    this.promise = new Promise<Cancel>(resolve => {
      resolvepromise = resolve
    })

    executor(message => {
      if (this.reason) return
      this.reason = new Cancel(message)
      resolvepromise(this.reason)
    })
  }
  throwIfRequested(): void {
    if (this.reason) {
      throw this.reason
    }
  }
  static source(): CancelTokenSource {
    let cancel!: Canceler
    const token = new CancelToken(c => cancel = c)
    return { cancel, token }
  }
}
