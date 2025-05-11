export function valiateTelegramLink(link: string): boolean {
  if (!link) return false

  // Основная проверка формата
  const telegramRegex = /^(https?:\/\/)?(t\.me\/|telegram\.me\/)(\+[a-zA-Z0-9_-]+|joinchat\/[a-zA-Z0-9_-]+)$/

  if (!telegramRegex.test(link)) {
    return false
  }

  // Дополнительные проверки
  if (link.includes(' ')) {
    return false
  }

  if (link.length > 100) {
    return false
  }

  return true // Валидация пройдена
}
