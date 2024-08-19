const info = (tag: string, log: boolean, ...data: any[]) => {
  if (log)
    console.log(tag, "::", data)
}

const warn = (tag: string, log: boolean, ...data: any[]) => {
  if (log)
    console.warn(tag, "::", data)
}

const error = (tag: string, log: boolean, ...data: any[]) => {
  if (log)
    console.error(tag, "::", data)
}

export default {info, warn, error}
