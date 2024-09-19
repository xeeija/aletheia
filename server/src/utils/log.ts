import { WriteStream } from "tty"
import { isDefined } from "./compare"

export enum LogLevel {
  Error,
  Warn,
  Info,
  Debug,
  Trace,
}

const EnvToLogLevel: Record<string, LogLevel> = {
  error: LogLevel.Error,
  warn: LogLevel.Warn,
  info: LogLevel.Info,
  debug: LogLevel.Debug,
  trace: LogLevel.Trace,
}

const parseLogLevel = (logLevel: string): LogLevel | undefined => {
  return EnvToLogLevel?.[logLevel] ?? LogLevel?.[parseInt(logLevel ?? "")]
}

export const logLevel = parseLogLevel(process.env.LOG_LEVEL ?? "") ?? LogLevel.Info

// Colors

const colors = {
  none: 0,
  black: 30,
  red: 31,
  green: 32,
  yellow: 33,
  blue: 34,
  magenta: 35,
  cyan: 36,
  white: 37,

  blackBright: 90,
  redBright: 91,
  greenBright: 92,
  yellowBright: 93,
  blueBright: 94,
  magentaBright: 95,
  cyanBright: 96,
  whiteBright: 97,
}

const bgColors = {
  none: 0,
  bgBlack: 40,
  bgRed: 41,
  bgGreen: 42,
  bgYellow: 43,
  bgBlue: 44,
  bgMagenta: 45,
  bgCyan: 46,
  bgWhite: 47,

  bgBlackBright: 100,
  bgRedBright: 101,
  bgGreenBright: 102,
  bgYellowBright: 103,
  bgBlueBright: 104,
  bgMagentaBright: 105,
  bgCyanBright: 106,
  bgWhiteBright: 107,
}

type ColorFunction = (str: string) => string

function genericColorWrapper(color: number, ending: number, inner?: ColorFunction): ColorFunction {
  return (str) => `\u001B[${color}m${inner ? inner(str) : str}\u001B[${ending}m`
}

function colorWrapper(color: keyof typeof colors): ColorFunction {
  return genericColorWrapper(colors[color], 39)
}

function bgColorWrapper(color: keyof typeof bgColors, fgWrapper: ColorFunction): ColorFunction {
  return genericColorWrapper(bgColors[color], 49, fgWrapper)
}

const LogLevelToColor: Record<LogLevel, ColorFunction> = {
  [LogLevel.Error]: colorWrapper("redBright"),
  [LogLevel.Warn]: colorWrapper("yellowBright"),
  [LogLevel.Info]: colorWrapper("none"),
  [LogLevel.Debug]: colorWrapper("magenta"),
  [LogLevel.Trace]: colorWrapper("cyan"),
}

const LogLevelToBgColor: Record<LogLevel, ColorFunction> = {
  [LogLevel.Error]: bgColorWrapper("bgRedBright", colorWrapper("white")),
  [LogLevel.Warn]: bgColorWrapper("bgYellow", colorWrapper("black")),
  [LogLevel.Info]: bgColorWrapper("bgBlue", colorWrapper("white")),
  // [LogLevel.INFO]: colorWrapper("blue"),
  [LogLevel.Debug]: bgColorWrapper("bgMagenta", colorWrapper("black")),
  [LogLevel.Trace]: bgColorWrapper("bgCyan", colorWrapper("black")),
}

// Names

const loglevelNames = new Map<string, LogLevel>()

const logConfigPattern = /([\w:-]+)=(error|warn|info|debug|trace)/gi

const nameMatches = [...(process.env.LOG_CONFIG ?? "").matchAll(logConfigPattern)]
nameMatches.forEach((match) => {
  const parsedLevel = parseLogLevel(match[2])
  if (isDefined(parsedLevel)) {
    loglevelNames.set(match[1], parsedLevel)
  }
})

const nameToLogLevel = (name: string) => {
  if (!name) {
    return undefined
  }
  const nameLogLevel = name.split(":").reduceRight<LogLevel | undefined>((acc, _, i, parts) => {
    const prefix = parts.slice(0, i + 1).join(":")
    return acc ?? loglevelNames.get(prefix)
  }, undefined)

  return nameLogLevel
}

// Logger and log function

type ConsoleFunction = typeof console.log
// type ConsoleFunction = (message?: any, ...params: any[]) => void

const LogLevelToFunction: Record<LogLevel, ConsoleFunction> = {
  [LogLevel.Error]: console.error,
  [LogLevel.Warn]: console.warn,
  [LogLevel.Info]: console.info,
  [LogLevel.Debug]: console.log,
  [LogLevel.Trace]: console.log,
}

const logFunction = (level: LogLevel, message: string, name: string = "", showTime = false) => {
  if (level > (nameToLogLevel(name) ?? logLevel)) {
    return
  }

  const noColor = process.env.NO_COLOR === "1"
  const useColors = !noColor && ((process.stdout as WriteStream | undefined)?.isTTY ?? true)

  const useTime = showTime || process.env.LOG_TIME === "1"
  const timeMsg = useTime ? `${new Date(Date.now()).toISOString()} ` : ""

  let messageFormatted = ""

  if (useColors) {
    const levelMsg = LogLevelToBgColor[level](LogLevel[level].toUpperCase())
    const nameMsg = name ? ` ${LogLevelToBgColor[level](name)}` : ""
    messageFormatted += `${LogLevelToColor[level](timeMsg)}${levelMsg}${nameMsg} ${LogLevelToColor[level](message)}`
  } else {
    messageFormatted += `${timeMsg}[${LogLevel[level].toUpperCase()}${name ? `:${name}` : ""}] ${message}`
  }

  // log to corresponding console
  const logFn = LogLevelToFunction[level]
  logFn(messageFormatted)
}

const parseParams = (...params: unknown[]) => params?.join(" ")

// const parseParams = (message: any, ...params: any[]) =>
// `${message}${params !== undefined ? ` ${params?.join(" ")}` : ""}`

export interface Logger {
  error: ConsoleFunction
  warn: ConsoleFunction
  info: ConsoleFunction
  log: ConsoleFunction
  debug: ConsoleFunction
  trace: ConsoleFunction
  time: Omit<Logger, "time">
}

export const createLogger = (name = "") => {
  const logger: Logger = {
    error: (message, params) => logFunction(LogLevel.Error, parseParams(message, params), name),
    warn: (message, params) => logFunction(LogLevel.Warn, parseParams(message, params), name),
    info: (message, params) => logFunction(LogLevel.Info, parseParams(message, params), name),
    log: (message, params) => logFunction(LogLevel.Info, parseParams(message, params), name),
    debug: (message, params) => logFunction(LogLevel.Debug, parseParams(message, params), name),
    trace: (message, params) => logFunction(LogLevel.Trace, parseParams(message, params), name),
    time: {
      error: (message, params) => logFunction(LogLevel.Error, parseParams(message, params), name, true),
      warn: (message, params) => logFunction(LogLevel.Warn, parseParams(message, params), name, true),
      info: (message, params) => logFunction(LogLevel.Info, parseParams(message, params), name, true),
      log: (message, params) => logFunction(LogLevel.Info, parseParams(message, params), name, true),
      debug: (message, params) => logFunction(LogLevel.Debug, parseParams(message, params), name, true),
      trace: (message, params) => logFunction(LogLevel.Trace, parseParams(message, params), name, true),
    },
  }

  return logger
}

export const logger = createLogger()
