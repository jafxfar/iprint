"use client"

import { useState, useRef, useEffect } from "react"
import { useInView } from "@/hooks/use-in-view"

import Interior1 from "@/assets/interior-print/interior1.jpg"
import Interior2 from "@/assets/interior-print/interior2.jpg"
import Interior3 from "@/assets/interior-print/interior3.jpg"
import Banner1 from "@/assets/banner-print/banner1.jpg"
import Banner2 from "@/assets/banner-print/banner2.jpg"
import Film1 from "@/assets/film-print/film1.jpg"
import PressWall1 from "@/assets/press-wall/press-wall1.jpg"
import PressWall2 from "@/assets/press-wall/press-wall2.jpg"
import PressWall3 from "@/assets/press-wall/press-wall3.jpg"
import GlassArt1 from "@/assets/glass-art/glass-art1.jpg"
import GlassPrint1 from "@/assets/glass-print/glass-print1.jpg"
import GlassPrint2 from "@/assets/glass-print/glass-print2.jpg"
import GlassPrint3 from "@/assets/glass-print/glass-print3.jpg"
import PVCPrint1 from "@/assets/pvc-print/pvc1.jpg"
import PVCPrint2 from "@/assets/pvc-print/pvc2.jpg"
import PVCPrint3 from "@/assets/pvc-print/pvc3.jpg"
import MetalPrint1 from "@/assets/metal-print/metal1.jpg"
import MetalPrint2 from "@/assets/metal-print/metal2.jpg"
import WoodPrint1 from "@/assets/wood-print/wood1.jpg"
import WoodPrint2 from "@/assets/wood-print/wood2.jpg"
import FoamboardPrint1 from "@/assets/foamboard-print/foamboard1.jpg"
import AcrylicPrint1 from "@/assets/acrylic-print/acrylic1.jpg"
import CeramicPrint1 from "@/assets/ceramic-print/ceramic1.jpg"
import CeramicPrint2 from "@/assets/ceramic-print/ceramic2.jpg"
import CeramicPrint3 from "@/assets/ceramic-print/ceramic3.jpg"
import PlywoodPrint1 from "@/assets/plywood-print/plywood-print1.jpg"
import LeatherPrint1 from "@/assets/leather-print/leather-print1.jpg"
import LeatherPrint2 from "@/assets/leather-print/leather-print2.jpg"
import LeatherPrint3 from "@/assets/leather-print/leather-print3.jpg"
import LeatherPrint4 from "@/assets/leather-print/leather-print4.jpg"

import Sign3 from "@/assets/signs/sign3.jpg"
import Sign4 from "@/assets/signs/sign4.jpg"
import Sign5 from "@/assets/signs/sign5.jpg"
import Sign6 from "@/assets/signs/sign6.jpg"
import Sign7 from "@/assets/signs/sign7.jpg"
import Sign8 from "@/assets/signs/sign8.jpg"
import Sign9 from "@/assets/signs/sign9.jpg"
import Sign10 from "@/assets/signs/sign10.jpg"

import SignInterior from "@/assets/signs/sign-interior.jpg"
import SignOutdoor from "@/assets/signs/sign-outdoor.jpg"
import SognRoof1 from "@/assets/signs/sign-roof1.jpg"
import SognRoof2 from "@/assets/signs/sign-roof2.jpg"
import SignRoof4 from "@/assets/signs/sign-roof4.jpg"
import SignLightbox from "@/assets/signs/sign-lightbox.webp"
import SignKron from "@/assets/signs/sign-kron.jpg"
import SignKron2 from "@/assets/signs/sign-kron2.jpg"
import ScheduleSign1 from "@/assets/signs/schedule-sign1.jpg"

// ─── Data ─────────────────────────────────────────────────────────────────────

type SubService = {
  id: string
  title: string
  description: string
  details: string[]
  materials: string[]
  price: string
  images: string[]
}

type ServiceCategory = {
  id: string
  title: string
  items: SubService[]
}

const services: ServiceCategory[] = [
  {
    id: "01",
    title: "Широкоформатная печать",
    items: [
      {
        id: "interior-print",
        title: "Интерьерная печать",
        description:
          "Широкоформатная интерьерная печать — это точная цветопередача и высокое качество изображений для оформления коммерческих и жилых помещений. Используем экосольвентные, латексные и УФ-чернила с разрешением до 1440 dpi.",
        details: [
          "Печать на самоклеющейся плёнке для витрин и стен",
          "Оформление торговых площадей и шоурумов",
          "Фотопанели, репродукции, модульные картины",
          "Напольная графика и навигационные системы",
        ],
        materials: ["Самоклеющаяся плёнка", "Холст", "Фотобумага", "PVC баннер"],
        price: "от 100 ₽/м²",
        images: [Interior1.src, Interior2.src, Interior3.src],
      },
      {
        id: "banner-print",
        title: "Печать на баннере",
        description:
          "Баннерная печать экосольвентными чернилами на ткань или сетку. Производим светоблокирующий, транслюцентный, ламинированный и литой баннер для любых конструкций.",
        details: [
          "Светоблокирующий (blackout) для двусторонних плакатов",
          "Транслюцентный (backlit) для лайтбоксов",
          "Литой (frontlit) для натяжки на фермовые конструкции",
          "Пресс-стены и фотозоны любого масштаба",
        ],
        materials: ["Blackout баннер", "Backlit баннер", "Frontlit баннер", "Сетчатый баннер"],
        price: "от 80 ₽/м²",
        images: [Banner2.src],
      },
      {
        id: "film-print",
        title: "Печать на плёнке",
        description:
          "Широкоформатная печать на самоклеющейся плёнке для брендирования витрин, торгового оборудования, стен и пола. Подходит для создания этикеток, стикеров, наклеек и крупных инсталляций.",
        details: [
          "Брендирование витрин и торгового оборудования",
          "Декоративное оформление стен и пола",
          "Таблички и указатели",
          "Стенды и экспозиционные материалы",
        ],
        materials: ["Глянцевая плёнка", "Матовая плёнка", "Световозвращающая плёнка", "Текстурная плёнка"],
        price: "от 120 ₽/м²",
        images: [Film1.src],
      },
      {
        id: "press-wall",
        title: "Пресс-стена",
        description:
          "Пресс-стены и фотозоны для мероприятий, презентаций и выставок. Печать с идеальной цветопередачей, монтаж на X-баннерных или фермовых конструкциях.",
        details: [
          "Фирменные пресс-стены для пресс-конференций",
          "Фотозоны для корпоративных мероприятий",
          "Тематические инсталляции для выставок",
          "Монтаж и демонтаж в срок",
        ],
        materials: ["Баннерная ткань", "Литой баннер", "Бэклит"],
        price: "от 2 500 ₽/шт",
        images: [PressWall3.src],
      },
    ],
  },
  {
    id: "02",
    title: "УФ печать",
    items: [
      {
        id: "glass-art",
        title: "Стеклянная картина",
        description:
          "Ультрафиолетовая печать на стекле создаёт яркие, долговечные изображения с насыщенными цветами. Подходит для интерьерного декора, офисных перегородок и предметов интерьера.",
        details: [
          "Декоративные панно и картины на стекле",
          "Офисные перегородки с фирменной графикой",
          "Фасадное остекление с брендингом",
          "Лимитированные серии для подарков",
        ],
        materials: ["Прозрачное стекло", "Тонированное стекло", "Зеркало"],
        price: "от 1 200 ₽/м²",
        images: [GlassArt1.src, Interior1.src],
      },
      {
        id: "glass-print",
        title: "Печать на стекле",
        description:
          "УФ-печать на стекле любой толщины — от 3 до 19 мм. Изображение наносится непосредственно на поверхность и не выцветает на протяжении всего срока службы изделия.",
        details: [
          "Офисные таблички и указатели",
          "Стеклянные фасадные конструкции",
          "Декоративные вставки в мебель",
          "Информационные стенды",
        ],
        materials: ["Флоат-стекло", "Закалённое стекло", "Многослойный триплекс"],
        price: "от 900 ₽/м²",
        images: [GlassPrint1.src, GlassPrint2.src, GlassPrint3.src],
      },
      {
        id: "pvc-print",
        title: "Печать на ПВХ",
        description:
          "Прямая УФ-печать на листовом ПВХ обеспечивает высокую детализацию и устойчивость к влаге и механическим воздействиям. Идеальна для наружной и внутренней рекламы.",
        details: [
          "Рекламные таблички и вывески",
          "Информационные стенды",
          "Декоративные панели",
          "Выставочные конструкции",
        ],
        materials: ["ПВХ 3 мм", "ПВХ 5 мм", "ПВХ 10 мм"],
        price: "от 350 ₽/м²",
        images: [PVCPrint1.src, PVCPrint2.src, PVCPrint3.src],
      },
      {
        id: "metal-print",
        title: "Печать на металле",
        description:
          "УФ-печать на алюминиевых и стальных листах для создания премиальных вывесок, табличек и арт-объектов. Изображение устойчиво к коррозии и выцветанию.",
        details: [
          "Фасадные вывески и таблички",
          "Памятные доски и сувенирная продукция",
          "Арт-объекты и декоративные панели",
          "Промышленная маркировка",
        ],
        materials: ["Алюминиевый лист", "Нержавеющая сталь", "Металлокомпозит"],
        price: "от 800 ₽/м²",
        images: [MetalPrint1.src, MetalPrint2.src],
      },
      {
        id: "wood-print",
        title: "Печать на дереве",
        description:
          "Прямая УФ-печать на массиве, фанере и МДФ. Изображение точно передаёт цвета и сохраняет фактуру дерева. Используется для декора интерьеров и сувенирной продукции.",
        details: [
          "Декоративные панно и картины",
          "Именные таблички и сувениры",
          "Оформление ресторанов и баров",
          "Корпоративные подарки",
        ],
        materials: ["Фанера", "МДФ", "Массив дерева", "Шпон"],
        price: "от 600 ₽/м²",
        images: [WoodPrint1.src, WoodPrint2.src],
      },
      {
        id: "foamboard-print",
        title: "Печать на пенокартоне",
        description:
          "Лёгкий и доступный материал для выставочных стендов, POS-материалов и временной рекламы. Печать с высоким разрешением, быстрое производство.",
        details: [
          "Выставочные стенды и экспозиции",
          "POS-материалы для торговых точек",
          "Временные вывески и указатели",
          "Декоративные элементы мероприятий",
        ],
        materials: ["Пенокартон 3 мм", "Пенокартон 5 мм", "Пенокартон 10 мм"],
        price: "от 200 ₽/м²",
        images: [FoamboardPrint1.src],
      },
      {
        id: "acrylic-print",
        title: "Печать на акриле",
        description:
          "УФ-печать на акриловом стекле создаёт эффект глубины и объёма. Подходит для имиджевых вывесок, интерьерного декора и дизайнерских арт-объектов.",
        details: [
          "Имиджевые вывески и логотипы",
          "Лайтбоксы и световые инсталляции",
          "Дизайнерские интерьерные объекты",
          "Сувенирная продукция",
        ],
        materials: ["Прозрачный акрил", "Цветной акрил", "Зеркальный акрил"],
        price: "от 1 500 ₽/м²",
        images: [AcrylicPrint1.src],
      },
      {
        id: "ceramic-print",
        title: "Печать на керамике",
        description:
          "Прямая УФ-печать на керамической плитке и изделиях. Изображение устойчиво к влаге, температуре и механическим воздействиям. Подходит для кухонь, ванных и общественных пространств.",
        details: [
          "Декоративные панно для кухонь и ванных",
          "Именные и памятные плитки",
          "Корпоративные сувениры",
          "Художественные инсталляции",
        ],
        materials: ["Керамическая плитка", "Керамогранит", "Фаянс"],
        price: "от 2 000 ₽/м²",
        images: [CeramicPrint1.src, CeramicPrint2.src, CeramicPrint3.src],
      },
      {
        id: "plywood-print",
        title: "Печать на фанере",
        description:
          "УФ-печать на фанере различной толщины для производства рекламных конструкций, декоративных элементов и выставочных стендов. Высокая прочность и доступная цена.",
        details: [
          "Рекламные конструкции и щиты",
          "Декоративные элементы интерьера",
          "Выставочные стенды",
          "Временные ограждения с брендингом",
        ],
        materials: ["Фанера 4 мм", "Фанера 8 мм", "Фанера 12 мм", "Фанера 18 мм"],
        price: "от 400 ₽/м²",
        images: [PlywoodPrint1.src],
      },
      {
        id: "leather-print",
        title: "Печать на коже",
        description:
          "Прямая УФ-печать на натуральной и искусственной коже для создания уникальных сувениров, аксессуаров и брендированных изделий.",
        details: [
          "Брендированные ежедневники и блокноты",
          "Фирменные папки и портфолио",
          "Кожаные сувениры и подарки",
          "Персонализированные аксессуары",
        ],
        materials: ["Натуральная кожа", "Экокожа", "Замша"],
        price: "от 1 800 ₽/м²",
        images: [LeatherPrint1.src, LeatherPrint2.src, LeatherPrint3.src, LeatherPrint4.src],
      },
    ],
  },
  {
    id: "03",
    title: "Вывески",
    items: [
      {
        id: "light-signs",
        title: "Световые вывески",
        description:
          "Световые вывески обеспечивают круглосуточную видимость бренда. Используем LED-модули последнего поколения с низким энергопотреблением и сроком службы до 100 000 часов.",
        details: [
          "Фасадные световые вывески любого размера",
          "Внутренняя подсветка объёмных букв",
          "Контражурная подсветка (гало-эффект)",
          "Управление яркостью и режимами",
        ],
        materials: ["LED-модули", "Акрил", "Алюминиевый профиль", "Нержавеющая сталь"],
        price: "от 8 000 ₽/м²",
        images: [Sign7.src, Sign3.src],
      },
      {
        id: "led-signs",
        title: "Светодиодные вывески",
        description:
          "Светодиодные вывески — современная альтернатива неону. Яркие, экономичные и долговечные конструкции для наружного и интерьерного применения.",
        details: [
          "Светодиодные контуры и бегущие строки",
          "RGB-подсветка с управлением цветом",
          "Светодиодные экраны и медиафасады",
          "Гибкий неон (flex LED)",
        ],
        materials: ["LED-лента", "Flex-неон", "LED-модули", "Контроллеры"],
        price: "от 5 000 ₽/м²",
        images: [Sign10.src],
      },
      {
        id: "interior-signs",
        title: "Интерьерные вывески",
        description:
          "Навигационные системы, рецепционные таблички и имиджевые инсталляции для офисов, торговых центров и общественных пространств.",
        details: [
          "Рецепционные логотипы и заголовки",
          "Навигационные системы wayfinding",
          "Офисные таблички и переговорные комнаты",
          "Декоративные инсталляции и арт-объекты",
        ],
        materials: ["Акрил", "Нержавеющая сталь", "МДФ", "Стекло"],
        price: "от 3 500 ₽/м²",
        images: [SignInterior.src],
      },
      {
        id: "facade-signs",
        title: "Фасадные вывески",
        description:
          "Фасадные вывески — лицо вашего бизнеса. Проектируем и изготавливаем конструкции, соответствующие архитектурному стилю здания и требованиям городской среды.",
        details: [
          "Разработка дизайна и согласование",
          "Объёмные буквы и логотипы",
          "Световые короба и лайтбоксы",
          "Монтаж с гарантией",
        ],
        materials: ["Алюминиевый композит", "Нержавеющая сталь", "Акрил", "ПВХ"],
        price: "от 12 000 ₽/м²",
        images: [Sign6.src, Sign4.src],
      },
      {
        id: "shop-signs",
        title: "Вывеска на магазин",
        description:
          "Комплексное оформление магазина: фасадная вывеска, витринная графика, навигация внутри торгового зала. Разрабатываем единый визуальный стиль.",
        details: [
          "Фасадная вывеска и козырёк",
          "Витринная графика и наклейки",
          "Внутренняя навигация и ценники",
          "Промо-материалы и стенды",
        ],
        materials: ["Алюминий", "Акрил", "Баннерная ткань", "Самоклеющаяся плёнка"],
        price: "от 15 000 ₽/комплект",
        images: [Sign5.src],
      },
      {
        id: "outdoor-signs",
        title: "Наружные вывески",
        description:
          "Наружные рекламные конструкции с защитой от атмосферных воздействий — ветра, осадков, перепадов температур. Все материалы сертифицированы для наружного применения.",
        details: [
          "Баннерные растяжки и перетяжки",
          "Щитовые конструкции и билборды",
          "Световые короба на зданиях",
          "Пилоны и отдельно стоящие конструкции",
        ],
        materials: ["Оцинкованный металл", "Алюминий", "Стойкие баннерные ткани"],
        price: "от 6 000 ₽/м²",
        images: [SignOutdoor.src],
      },
      {
        id: "lightbox",
        title: "Лайтбоксы",
        description:
          "Лайтбоксы — подсвеченные рекламные короба с равномерной засветкой по всей площади. Применяются для меню, рекламных постеров и имиджевых инсталляций.",
        details: [
          "Односторонние и двусторонние лайтбоксы",
          "Тонкие (slim) профили для минималистичного дизайна",
          "Сменные вставки для обновления контента",
          "Динамические лайтбоксы с анимацией",
        ],
        materials: ["Алюминиевый профиль", "Бэклит-баннер", "LED-панели", "Акрил"],
        price: "от 4 500 ₽/м²",
        images: [SignLightbox.src],
      },
      {
        id: "panel-bracket",
        title: "Панель-кронштейны",
        description:
          "Консольные вывески (панель-кронштейны) хорошо видны вдоль улицы и под прямым углом к фасаду. Оптимальны для торговых улиц с плотной застройкой.",
        details: [
          "Двусторонние консольные вывески",
          "Световые и несветовые конструкции",
          "Кованые и фигурные кронштейны",
          "Монтаж без повреждения фасада",
        ],
        materials: ["Алюминий", "Оцинкованная сталь", "Акрил"],
        price: "от 7 000 ₽/шт",
        images: [SignKron.src, SignKron2.src],
      },
      {
        id: "3d-letters",
        title: "Объёмные буквы",
        description:
          "Объёмные буквы и логотипы — самый эффективный способ выделить бизнес. Производим из металла, акрила и пластика с подсветкой или без.",
        details: [
          "Металлические буквы из нержавеющей стали",
          "Акриловые буквы с внутренней подсветкой",
          "Буквы с контражурной (гало) подсветкой",
          "Пластиковые буквы для интерьера",
        ],
        materials: ["Нержавеющая сталь", "Акрил", "АБС-пластик", "Медь/латунь"],
        price: "от 3 000 ₽/буква",
        images: [Sign8.src],
      },
      {
        id: "sign-letters",
        title: "Буквы на вывеске",
        description:
          "Отдельные буквы на вывеску — универсальное решение для оформления фасадов. Крепятся непосредственно к стене или на металлический профиль.",
        details: [
          "Плоские буквы из различных материалов",
          "Нанесение на любую поверхность",
          "Единый стиль с фирменным знаком",
          "Долговечность от 10 лет",
        ],
        materials: ["Акрил", "ПВХ", "Нержавеющая сталь", "Алюминий"],
        price: "от 800 ₽/буква",
        images: [Sign9.src],
      },
      {
        id: "roof-constructions",
        title: "Крышные конструкции",
        description:
          "Крышные рекламные конструкции обеспечивают максимальную видимость на большом расстоянии. Проектируем, согласовываем и монтируем с соблюдением всех норм безопасности.",
        details: [
          "Стальные каркасные конструкции",
          "Буквенные и логотипные крышные установки",
          "Согласование с администрацией города",
          "Молниезащита и заземление",
        ],
        materials: ["Конструкционная сталь", "Нержавеющая сталь", "LED"],
        price: "от 50 000 ₽/проект",
        images: [SognRoof2.src,SognRoof1.src, SignRoof4.src],
      },
    ],
  },
  {
    id: "04",
    title: "Таблички",
    items: [
      {
        id: "schedule-signs",
        title: "Таблички с графиком работы",
        description:
          "Информационные таблички с режимом работы организации. Изготавливаем из акрила, металла и ПВХ с возможностью нанесения логотипа и фирменного стиля.",
        details: [
          "Стандартные и нестандартные форматы",
          "Нанесение фирменного стиля",
          "Варианты крепления: магниты, скотч, винты",
          "Быстрое изготовление — от 1 дня",
        ],
        materials: ["Акрил", "ПВХ", "Алюминий", "Нержавеющая сталь"],
        price: "от 300 ₽/шт",
        images: [ScheduleSign1.src],
      },
    ],
  },
  {
    id: "05",
    title: "Стенды",
    items: [
      {
        id: "exhibition-stand",
        title: "Выставочный стенд",
        description:
          "Разрабатываем и изготавливаем выставочные стенды любой сложности — от стандартных модульных до эксклюзивных нестандартных конструкций под конкретную выставку.",
        details: [
          "3D-проектирование и визуализация",
          "Модульные и нестандартные конструкции",
          "Полное брендирование стенда",
          "Монтаж и демонтаж на площадке",
        ],
        materials: ["Алюминиевая система", "МДФ", "Акрил", "Баннерная ткань"],
        price: "от 35 000 ₽/м²",
        images: [PressWall1.src],
      },
      {
        id: "mobile-stands",
        title: "Мобильные выставочные стенды",
        description:
          "Лёгкие и компактные стенды для частых выставок и деловых мероприятий. Собираются без инструментов за 10 минут и умещаются в чехол для перевозки.",
        details: [
          "Pop-up стенды и баннерные стойки",
          "X-Banner и Roll-Up конструкции",
          "Складные выставочные столы",
          "Тканевые натяжные стенды",
        ],
        materials: ["Алюминиевый каркас", "Баннерная ткань", "Пластиковые соединители"],
        price: "от 3 500 ₽/шт",
        images: [PressWall2.src,Banner1.src],
      },
    ],
  },
]

// ─── Sub-service detail panel ─────────────────────────────────────────────────

function ServiceDetail({
  sub,
  onClose,
}: {
  sub: SubService
  onClose: () => void
}) {
  const panelRef = useRef<HTMLDivElement>(null)
  const [imageIndex, setImageIndex] = useState(0)
  const images = sub.images
  const hasGallery = images.length > 1

  useEffect(() => {
    setImageIndex(0)
  }, [sub.id])

  // Animate in
  useEffect(() => {
    const el = panelRef.current
    if (!el) return
    el.style.opacity = "0"
    el.style.transform = "translateX(24px)"
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.45s cubic-bezier(0.16,1,0.3,1), transform 0.45s cubic-bezier(0.16,1,0.3,1)"
      el.style.opacity = "1"
      el.style.transform = "translateX(0)"
    })
  }, [sub.id])

  return (
    <div ref={panelRef} className="flex flex-col h-full">
      {/* Back button */}
      <button
        onClick={onClose}
        className="flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors duration-200 mb-8 self-start group"
        aria-label="Закрыть"
      >
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          className="transition-transform duration-300 group-hover:-translate-x-1"
        >
          <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Назад к услугам
      </button>

      {/* Image / gallery */}  
      <div className="relative w-full aspect-video bg-muted overflow-hidden mb-8">
        <img
          src={images[imageIndex] ?? images[0]}
          alt={hasGallery ? `${sub.title} — фото ${imageIndex + 1}` : sub.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {hasGallery && (
          <>
            <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-3 pointer-events-none">
              <button
                type="button"
                onClick={() =>
                  setImageIndex((i) => (i - 1 + images.length) % images.length)
                }
                className="pointer-events-auto flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 border border-border bg-background/90 text-foreground hover:bg-muted transition-colors duration-200"
                aria-label="Предыдущее фото"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M10 12L6 8l4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setImageIndex((i) => (i + 1) % images.length)}
                className="pointer-events-auto flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 border border-border bg-background/90 text-foreground hover:bg-muted transition-colors duration-200"
                aria-label="Следующее фото"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M6 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 pointer-events-none">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setImageIndex(i)}
                  className={`pointer-events-auto h-1.5 rounded-full transition-all duration-200 ${
                    i === imageIndex
                      ? "w-6 bg-foreground"
                      : "w-1.5 bg-foreground/30 hover:bg-foreground/50"
                  }`}
                  aria-label={`Фото ${i + 1}`}
                  aria-current={i === imageIndex}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Title */}
      <h3
        className="font-serif font-bold text-foreground leading-tight mb-4"
        style={{ fontSize: "clamp(1.6rem, 3vw, 2.6rem)", letterSpacing: "-0.02em" }}
      >
        {sub.title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm leading-relaxed mb-8">
        {sub.description}
      </p>

      {/* Details */}
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Что входит</p>
        <ul className="flex flex-col gap-3">
          {sub.details.map((d) => (
            <li key={d} className="flex items-start gap-3 text-sm text-foreground">
              <span className="mt-2 w-1 h-1 rounded-full bg-foreground shrink-0" aria-hidden="true" />
              {d}
            </li>
          ))}
        </ul>
      </div>

      {/* Materials */}
      <div className="mb-8">
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Материалы</p>
        <div className="flex flex-wrap gap-2">
          {sub.materials.map((m) => (
            <span
              key={m}
              className="text-xs px-3 py-1.5 border border-border bg-[#65B337] text-white"
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Price + CTA */}
      <div className="border-t border-border pt-6 flex items-center justify-between gap-4 mt-auto">
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">Стоимость</p>
          <p className="font-serif font-bold text-foreground text-xl">{sub.price}</p>
        </div>
        <a
          href="#contact"
          className="inline-flex items-center gap-3 px-6 py-3 bg-foreground text-background text-xs tracking-widest uppercase hover:opacity-80 transition-opacity duration-200"
        >
          Заказать
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  )
}

// ─── SubList: renders sub-services using React state for visibility ──────────

function SubList({
  items,
  activeSub,
  onSelect,
}: {
  items: SubService[]
  activeSub: SubService | null
  onSelect: (item: SubService) => void
}) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Tiny delay so React can mount the DOM nodes before we flip opacity
    const t = setTimeout(() => setVisible(true), 20)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex flex-col pb-3">
      {items.map((item, i) => {
        const isActive = activeSub?.id === item.id
        return (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="flex items-center justify-between py-2.5 pl-7 pr-2 text-left rounded-sm"
            style={{
              background: isActive ? "var(--muted)" : "transparent",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(8px)",
              transition: `opacity 0.3s ease ${i * 40}ms, transform 0.3s ease ${i * 40}ms`,
            }}
          >
            <span
              className="text-sm text-left"
              style={{
                color: isActive ? "var(--foreground)" : "var(--muted-foreground)",
                fontWeight: isActive ? "500" : "400",
              }}
            >
              {item.title}
            </span>
            <svg
              width="12" height="12" viewBox="0 0 12 12" fill="none"
              className="shrink-0 ml-2"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateX(0)" : "translateX(-4px)",
                transition: "opacity 0.2s ease, transform 0.2s ease",
                color: "var(--foreground)",
              }}
            >
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )
      })}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ServicesSection() {
  const { ref: headerRef, inView: headerInView } = useInView()
  const [activeCategory, setActiveCategory] = useState<string>(services[0].id)
  const [activeSub, setActiveSub] = useState<SubService | null>(null)

  const currentCategory = services.find((s) => s.id === activeCategory)!

  return (
    <section id="services" className="py-28 border-t border-border">
      {/* ── Section header ── */}
      <div
        ref={headerRef as React.RefObject<HTMLDivElement>}
        className="px-8 max-w-screen-2xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16"
        style={{
          opacity: headerInView ? 1 : 0,
          transform: headerInView ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-[#65B337] mb-4">Что мы делаем</p>
          <h2
            className="font-serif font-bold text-[#65B337] leading-none"
            style={{ fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.03em" }}
          >
            Услуги
          </h2>
        </div>
        <p className="max-w-sm text-muted-foreground text-sm leading-relaxed">
          Полный цикл рекламного производства — от разработки дизайна до монтажа и изготовления любых форматов.
        </p>
      </div>

      {/* ── Main layout: sidebar + content ── */}
      <div className="px-8 max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-0 min-h-[700px]">

        {/* LEFT: Accordion sidebar */}
        <div className="lg:w-80 xl:w-96 shrink-0 border-r border-border pr-0 lg:pr-8">
          <div className="flex flex-col">
            {services.map((cat) => {
              const isOpen = activeCategory === cat.id
              return (
                <div key={cat.id} className="border-b border-border">
                  {/* Category header — click to open/close */}
                  <button
                    onClick={() => {
                      setActiveCategory(cat.id)
                      setActiveSub(null)
                    }}
                    className="w-full flex items-center justify-between py-4 text-left group transition-colors duration-200"
                    style={{
                      color: isOpen ? "#65B337" : "var(--muted-foreground)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] tracking-widest shrink-0 text-muted-foreground">
                        {cat.id}
                      </span>
                      <span
                        className="font-serif font-bold transition-colors duration-200"
                        style={{ fontSize: "0.95rem", letterSpacing: "-0.01em" }}
                      >
                        {cat.title}
                      </span>
                    </div>
                    {/* Chevron rotates when open */}
                    <svg
                      width="14" height="14" viewBox="0 0 14 14" fill="none"
                      className="shrink-0 transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
                    >
                      <path d="M5 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {/* Sub-services — inline accordion, visible only when category is open */}
                  {isOpen && (
                    <SubList
                      items={cat.items}
                      activeSub={activeSub}
                      onSelect={setActiveSub}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* RIGHT: Detail panel or empty state */}
        <div className="flex-1 lg:pl-12 pt-8 lg:pt-0">
          {activeSub ? (
            <ServiceDetail
              sub={activeSub}
              onClose={() => setActiveSub(null)}
            />
          ) : (
            <EmptyState category={currentCategory} onSelect={setActiveSub} />
          )}
        </div>
      </div>

      {/* ── CTA row ── */}
      <div className="px-8 max-w-screen-2xl mx-auto mt-20 pt-10 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <p className="text-muted-foreground text-sm">Не нашли нужную услугу? Обсудим индивидуально.</p>
        <a
          href="#contact"
          className="group inline-flex items-center gap-3 text-sm tracking-widest uppercase text-foreground"
        >
            <span className="h-px w-8 bg-[#65B337] transition-all duration-500 group-hover:w-16" />
          Обсудить проект
        </a>
      </div>
    </section>
  )
}

// ─── Empty state when no sub-service selected ─────────────────────────────────

function EmptyState({
  category,
  onSelect,
}: {
  category: ServiceCategory
  onSelect: (sub: SubService) => void
}) {
  return (
    <div className="flex flex-col h-full">
      <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
        {category.title} — {category.items.length} {category.items.length === 1 ? "услуга" : "услуги"}
      </p>
      <h3
        className="font-serif font-bold text-foreground leading-tight mb-8"
        style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", letterSpacing: "-0.02em" }}
      >
        Выберите услугу<br />из списка слева
      </h3>

      {/* Quick-access grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {category.items.map((item, i) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="flex items-center justify-between p-5 border border-border hover:border-foreground hover:bg-muted transition-all duration-300 text-left group"
            style={{
              opacity: 0,
              animation: `fadeSlideIn 0.4s ease ${i * 50}ms forwards`,
            }}
          >
            <div>
              <span className="text-[10px] tracking-widest text-muted-foreground block mb-1">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-medium text-foreground">{item.title}</span>
            </div>
            <svg
              width="16" height="16" viewBox="0 0 16 16" fill="none"
              className="shrink-0 text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:translate-x-1"
            >
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  )
}
