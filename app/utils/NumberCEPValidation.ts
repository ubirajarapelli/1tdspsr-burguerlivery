export const isValidNumber = (value: number) => {
  return !isNaN(value) && isFinite(value)
}
export const formatCEP = (cep: string) => {
  return cep.replace(/(\d{5})(\d{3})/, "$1-$2")
}