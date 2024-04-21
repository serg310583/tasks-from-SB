import { encoded, translations } from './data.js'

function decodeFields(encoded, translations) {
	// Функция для расшифровки значения поля по его id
	function decodeField(id) {
		return translations[id] || id // Возвращаем расшифровку или исходное значение, если расшифровка не найдена
	}
	//Список исключаемых полей
	const excludeFields = ['groupId', 'service', 'formatSize', 'ca']
	// Расшифрованные данные
	const decoded = encoded.map((item) => {
		const decodedItem = {}
		// Проходим по каждому полю объекта
		for (const key in item) {
			// Если поле необходимо исключить, просто копируем его
			if (excludeFields.includes(key)) {
				decodedItem[key] = item[key]
			} else {
				// Расшифровываем значение поля
				decodedItem[key] = decodeField(item[key])
			}
		}
		return decodedItem
	})
	// Получаем все id (строковые значения) из объектов в _encoded_
	const allIds = new Set(
		encoded.flatMap((item) =>
			Object.values(item).filter((val) => typeof val === 'string')
		)
	)
	// Формируем список уникальных id, которые отсутствуют в translations
	const uniqueIds = Array.from(allIds).filter(
		(id) => !translations.hasOwnProperty(id)
	)
	return { decoded, uniqueIds }
}

const { decoded, uniqueIds } = decodeFields(encoded, translations)

console.log('Расшифрованные данные', decoded)
console.log('Список уникальных id:', uniqueIds)
