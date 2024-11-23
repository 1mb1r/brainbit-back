export function generatePrologPrompt(maniacName: string, victimName: string) {
  return `Ты рассказчик, который создает атмосферную хоррор-историю. История начинается в старой деревне,
    куда прибывает игрок-жертва по имени ${victimName}, чтобы навестить пустующий дом своей покойной бабушки.
    В этой же деревне находится игрок-маньяк по имени ${maniacName}, который планирует совершить что-то жуткое. Напиши короткий пролог (40–80 слов),
    создающий мрачное настроение и вводящий обоих игроков в сюжет. Пролог должен быть понятен для аудитории 12+ и сохранять интригу 
    без излишних подробностей. Возвращай результат в формате JSON с полями: 
    - 'text': <Текст пролога (40–80 слов)>. 
    - 'description': <Краткое описание текста (1 предложение, передающее суть происходящего)>. 
    - 'time': <Точное время событий в формате HH:mm>. 
    - 'order': 0. 
    Пример структуры ответа: 
    { 
      "text": "Сумерки окутали деревню, когда [имя жертвы] подошла к скрипучей двери бабушкиного дома. Пустые окна смотрели в ночь, а где-то в лесу затаился [имя маньяка], изучая свою новую цель.", 
      "description": "Игрок-жертва прибыла в старый дом своей бабушки, где затаился игрок-маньяк.", 
      "time": "20:15", 
      "order": 0 
    }`;
}

export function generateActionsPrompt(role: string, data: number[]) {
  return `Ты создаешь варианты действий для игрока, который участвует в интерактивной хоррор-истории. Игрок (маньяк или жертва) совершает ход, выбирая одно из предложенных действий. Ты получаешь массив данных концентрации игрока (числа от 0 до 100, например: [21, 33, 55, 73, 62]) и должен предложить четыре возможных действия.

      - Каждое действие описывается в формате JSON с полями:
        - 'title': <Короткое описание действия (1 предложение)>.
        - 'isLocked': <true или false, зависит от того, доступно ли действие при данном уровне концентрации>.
        - 'effect': <Краткое описание последствий этого действия (не более 20 слов)>.

      - 'isLocked' = true, если действие требует высокого уровня концентрации, а его значение недостаточно (например, для сложного действия требуется уровень выше 60, а среднее значение массива ниже).

      Пример структуры ответа:
      [
        {
          "title": "Затаиться в доме, следя за жертвой.",
          "isLocked": false,
          "effect": "Маньяк прячется в тени, изучая каждое движение жертвы."
        },
        {
          "title": "Попытаться пробраться в дом через окно.",
          "isLocked": true,
          "effect": "Маньяк незаметно проникает внутрь, подготавливая ловушку."
        },
        {
          "title": "Сделать ложный след, чтобы отвлечь жертву.",
          "isLocked": false,
          "effect": "Маньяк оставляет следы, ведущие к лесу."
        },
        {
          "title": "Оставить угрожающее послание на двери.",
          "isLocked": true,
          "effect": "Жертва находит пугающее сообщение и начинает паниковать."
        }
      ]

      Текущие показатели концентрации игрока-${role}: ${data}.

      Важно: действия должны логически следовать из предыдущих событий, учитывай роль игрока, поддерживай атмосферу напряжения и не нарушай логику игры для аудитории 12+. Придумай подходящие действия для текущей ситуации.`;
}

export function generateNextStoryPrompt(
  beforePromptText: string,
  effect: string,
) {
  return `Ты рассказчик, который продолжает хоррор-историю. Вот текущая ситуация:

    - Пролог или предыдущее событие: ${beforePromptText}$.
    - Выбранное действие игрока: ${effect}.

    На основе этого напиши логичное продолжение истории (40–80 слов), поддерживая атмосферу напряжения и интриги. Возвращай результат в формате JSON с полями:
    - 'text': <Текст продолжения (40–80 слов)>.
    - 'description': <Краткое описание текста (1 предложение, передающее суть происходящего)>.
    - 'time': <Точное время событий в формате HH:mm, логически продолжающее предыдущие события>.
    - 'order': <Инкрементированное значение счетчика>.

    Пример структуры ответа:
    {
      "text": "Жертва, услышав скрип половиц, бросилась к двери, но наткнулась на угрожающее послание, оставленное маньяком. Тишина сгустилась.",
      "description": "Жертва обнаружила угрозу и пытается спастись.",
      "time": "20:25",
      "order": 1
    }

    Важно: история должна оставаться связной и завершиться на 6-м ходу победой одной из сторон (жертва спасается или маньяк ее ловит). Не забывай учитывать возрастное ограничение 12+.`;
}
