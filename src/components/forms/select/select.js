// Підключення функціоналу "Чортоги Фрілансера"
import { isMobile, slideUp, slideDown, slideToggle, FLS } from "@js/common/functions.js";
// Підключення функціоналу модуля форм
import { formValidate } from "../_functions.js";

/*
Документація:
Сніппет (HTML): sel
*/
/*
// Налаштування
Для селекту (select):
class="ім'я класу" - модифікатор до конкретного селекту
multiple - мультивибір
data-fls-select-modif= "ім'я модифікатора"
data-fls-select-tags - режим тегів, тільки для (тільки для multiple)
data-fls-select-scroll - увімкнути прокручування для списку, що випадає, додатково можна підключити кастомний скролл simplebar в app.js. Зазначене число для атрибуту обмежить висоту
data-fls-select-checkbox - стилізація елементів по checkbox (тільки для multiple)
data-fls-select-show-selected - вимикає приховування вибраного елемента
data-fls-select-search - дозволяє шукати по списку, що випадає
data-fls-select-open - селект відкритий відразу
data-fls-select-submit - відправляє форму при зміні селекту

data-fls-select-one-select - селекти всередині оболонки з атрибутом показуватимуться лише по одному
data-fls-select-pseudo-label - додає псевдоелемент до заголовка селекту із зазначеним текстом

Для плейсхолдера (Плейсхолдер – це option з value=""):
data-fls-select-label для плейсхолдера, додає label до селекту
data-fls-select-show для плейсхолдера, показує його у списку (тільки для одиничного вибору)

Для елемента (option):
data-fls-select-class="ім'я класу" - додає клас
data-fls-select-asset="шлях до картинки або текст" - додає структуру 2х колонок та даними
data-fls-select-href="адреса посилання" - додає посилання в елемент списку
data-fls-select-href-blank - відкриє посилання у новому вікні
*/

/*
// Можливі доопрацювання:
попап на мобілці
оновлення даних (Женя iniline)
*/

import "./select.scss";

// Клас побудови Select
class SelectConstructor {
	constructor(props, data = null) {
		let defaultConfig = {
			init: true,
			speed: 150
		}
		this.config = Object.assign(defaultConfig, props);
		// CSS класи модуля
		this.selectClasses = {
			classSelect: "select", // Головний блок
			classSelectBody: "select__body", // Тіло селекту
			classSelectTitle: "select__title", // Заголовок
			classSelectValue: "select__value", // Значення у заголовку
			classSelectLabel: "select__label", // Лабел
			classSelectInput: "select__input", // Поле введення
			classSelectText: "select__text", // Оболонка текстових даних
			classSelectLink: "select__link", // Посилання в елементі
			classSelectOptions: "select__options", // Випадаючий список
			classSelectOptionsScroll: "select__scroll", // Оболонка при скролі
			classSelectOption: "select__option", // Пункт
			classSelectContent: "select__content", // Оболонка контенту в заголовку
			classSelectRow: "select__row", // Ряд
			classSelectData: "select__asset", // Додаткові дані
			classSelectDisabled: "--select-disabled", // Заборонено
			classSelectTag: "--select-tag", // Клас тега
			classSelectOpen: "--select-open", // Список відкритий
			classSelectActive: "--select-active", // Список вибрано
			classSelectFocus: "--select-focus", // Список у фокусі
			classSelectMultiple: "--select-multiple", // Мультивибір
			classSelectCheckBox: "--select-checkbox", // Стиль чекбоксу
			classSelectOptionSelected: "--select-selected", // Вибраний пункт
			classSelectPseudoLabel: "--select-pseudo-label", // Псевдолейбл
		}
		this._this = this;
		// Запуск ініціалізації
		if (this.config.init) {
			// Отримання всіх select на сторінці
			const selectItems = data ? document.querySelectorAll(data) : document.querySelectorAll('select[data-fls-select]');
			if (selectItems.length) {
				this.selectsInit(selectItems);
				FLS(`_FLS_SELECT_START`, selectItems.length)
			} else {
				FLS('_FLS_SELECT_SLEEP')
			}
		}
	}
	// Конструктор CSS класу
	getSelectClass(className) {
		return `.${className}`;
	}
	// Геттер елементів псевдоселекту
	getSelectElement(selectItem, className) {
		return {
			originalSelect: selectItem.querySelector('select'),
			selectElement: selectItem.querySelector(this.getSelectClass(className)),
		}
	}
	// Функція ініціалізації всіх селектів
	selectsInit(selectItems) {
		selectItems.forEach((originalSelect, index) => {
			this.selectInit(originalSelect, index + 1);
		});
		// Обробники подій...
		// ...при кліку
		document.addEventListener('click', function (e) {
			this.selectsActions(e);
		}.bind(this));
		// ...при натисканні клавіші
		document.addEventListener('keydown', function (e) {
			this.selectsActions(e);
		}.bind(this));
		// ...при фокусі
		document.addEventListener('focusin', function (e) {
			this.selectsActions(e);
		}.bind(this));
		// ...при втраті фокусу
		document.addEventListener('focusout', function (e) {
			this.selectsActions(e);
		}.bind(this));
	}
	// Функція ініціалізації конкретного селекту
	selectInit(originalSelect, index) {
		const _this = this;
		// Створюємо оболонку
		let selectItem = document.createElement("div");
		selectItem.classList.add(this.selectClasses.classSelect);
		// Виводимо оболонку перед оригінальним селектом
		originalSelect.parentNode.insertBefore(selectItem, originalSelect);
		// Поміщаємо оригінальний селект в оболонку
		selectItem.appendChild(originalSelect);
		// Приховуємо оригінальний селект
		originalSelect.hidden = true;
		// Привласнюємо унікальний ID
		index ? originalSelect.dataset.flsSelectId = index : null;

		// Робота з плейсхолдером
		if (this.getSelectPlaceholder(originalSelect)) {
			// Запам'ятовуємо плейсхолдер
			originalSelect.dataset.placeholder = this.getSelectPlaceholder(originalSelect).value;
			// Якщо увімкнено режим label
			if (this.getSelectPlaceholder(originalSelect).label.show) {
				const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
				selectItemTitle.insertAdjacentHTML('afterbegin', `<span class="${this.selectClasses.classSelectLabel}">${this.getSelectPlaceholder(originalSelect).label.text ? this.getSelectPlaceholder(originalSelect).label.text : this.getSelectPlaceholder(originalSelect).value}</span>`);
			}
		}
		// Конструктор основних елементів
		selectItem.insertAdjacentHTML('beforeend', `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`);
		// Запускаємо конструктор псевдоселекту
		this.selectBuild(originalSelect);

		// Запам'ятовуємо швидкість
		originalSelect.dataset.flsSelectSpeed = originalSelect.dataset.flsSelectSpeed ? originalSelect.dataset.flsSelectSpeed : this.config.speed;
		this.config.speed = +originalSelect.dataset.flsSelectSpeed

		// Подія при зміні оригінального select
		originalSelect.addEventListener('change', function (e) {
			_this.selectChange(e);
		});
	}
	// Конструктор псевдоселекту
	selectBuild(originalSelect) {
		const selectItem = originalSelect.parentElement;
		// Додаємо ID селекту
		selectItem.dataset.flsSelectId = originalSelect.dataset.flsSelectId;
		// Отримуємо клас оригінального селекту, створюємо модифікатор та додаємо його
		originalSelect.dataset.flsSelectModif ? selectItem.classList.add(`select--${originalSelect.dataset.flsSelectModif}`) : null;
		// Якщо множинний вибір, додаємо клас
		originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectMultiple) : selectItem.classList.remove(this.selectClasses.classSelectMultiple);
		// Cтилізація елементів під checkbox (тільки для multiple)
		originalSelect.hasAttribute('data-fls-select-checkbox') && originalSelect.multiple ? selectItem.classList.add(this.selectClasses.classSelectCheckBox) : selectItem.classList.remove(this.selectClasses.classSelectCheckBox);
		// Сеттер значення заголовка селекту
		this.setSelectTitleValue(selectItem, originalSelect);
		// Сеттер елементів списку (options)
		this.setOptions(selectItem, originalSelect);
		// Якщо увімкнено опцію пошуку data-search, запускаємо обробник
		originalSelect.hasAttribute('data-fls-select-search') ? this.searchActions(selectItem) : null;
		// Якщо вказано налаштування data-open, відкриваємо селект
		originalSelect.hasAttribute('data-fls-select-open') ? this.selectAction(selectItem) : null;
		// Обробник disabled
		this.selectDisabled(selectItem, originalSelect);
	}
	// Функція реакцій на події
	selectsActions(e) {
		const targetElement = e.target;
		const targetType = e.type;
		if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect)) || targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
			const selectItem = targetElement.closest('.select') ? targetElement.closest('.select') : document.querySelector(`.${this.selectClasses.classSelect}[data-fls-select-id="${targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag)).dataset.flsSelectId}"]`);
			const originalSelect = this.getSelectElement(selectItem).originalSelect;
			if (targetType === 'click') {
				if (!originalSelect.disabled) {
					if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag))) {
						// Обробка кліка на тег
						const targetTag = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTag));
						const optionItem = document.querySelector(`.${this.selectClasses.classSelect}[data-fls-select-id="${targetTag.dataset.flsSelectId}"] .select__option[data-fls-select-value="${targetTag.dataset.flsSelectValue}"]`);
						this.optionAction(selectItem, originalSelect, optionItem);
					} else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectTitle))) {
						// Обробка кліка на заголовок селекту
						this.selectAction(selectItem);
					} else if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption))) {
						// Обробка кліка на елемент селекту
						const optionItem = targetElement.closest(this.getSelectClass(this.selectClasses.classSelectOption));
						this.optionAction(selectItem, originalSelect, optionItem);
					}
				}
			} else if (targetType === 'focusin' || targetType === 'focusout') {
				if (targetElement.closest(this.getSelectClass(this.selectClasses.classSelect))) {
					targetType === 'focusin' ? selectItem.classList.add(this.selectClasses.classSelectFocus) : selectItem.classList.remove(this.selectClasses.classSelectFocus);
				}
			} else if (targetType === 'keydown' && e.code === 'Escape') {
				this.selectsСlose();
			}
		} else {
			this.selectsСlose();
		}
	}
	// Функція закриття всіх селектів
	selectsСlose(selectOneGroup) {
		const selectsGroup = selectOneGroup ? selectOneGroup : document;
		const selectActiveItems = selectsGroup.querySelectorAll(`${this.getSelectClass(this.selectClasses.classSelect)}${this.getSelectClass(this.selectClasses.classSelectOpen)}`);
		if (selectActiveItems.length) {
			selectActiveItems.forEach(selectActiveItem => {
				this.selectСlose(selectActiveItem);
			});
		}
	}
	// Функція закриття конкретного селекту
	selectСlose(selectItem) {
		const originalSelect = this.getSelectElement(selectItem).originalSelect;
		const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
		if (!selectOptions.classList.contains('_slide')) {
			selectItem.classList.remove(this.selectClasses.classSelectOpen);
			slideUp(selectOptions, originalSelect.dataset.flsSelectSpeed);
			setTimeout(() => {
				selectItem.style.zIndex = '';
			}, originalSelect.dataset.flsSelectSpeed);
		}
	}
	// Функція відкриття/закриття конкретного селекту
	selectAction(selectItem) {
		const originalSelect = this.getSelectElement(selectItem).originalSelect;
		const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
		const selectOpenzIndex = originalSelect.dataset.flsSelectZIndex ? originalSelect.dataset.flsSelectZIndex : 3;

		// Визначаємо, де видобразити випадаючий список
		this.setOptionsPosition(selectItem);

		// Якщо селективи розміщені в елементі з дата атрибутом data-one-select
		// закриваємо усі відкриті селекти
		if (originalSelect.closest('[data-one-select]')) {
			const selectOneGroup = originalSelect.closest('[data-fls-select-one-select]');
			this.selectsСlose(selectOneGroup);
		}

		setTimeout(() => {
			if (!selectOptions.classList.contains('_slide')) {
				selectItem.classList.toggle(this.selectClasses.classSelectOpen);
				slideToggle(selectOptions, originalSelect.dataset.flsSelectSpeed);

				if (selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
					selectItem.style.zIndex = selectOpenzIndex;
				} else {
					setTimeout(() => {
						selectItem.style.zIndex = '';
					}, originalSelect.dataset.flsSelectSpeed);
				}
			}
		}, 0);
	}
	// Сеттер значення заголовка селекту
	setSelectTitleValue(selectItem, originalSelect) {
		const selectItemBody = this.getSelectElement(selectItem, this.selectClasses.classSelectBody).selectElement;
		const selectItemTitle = this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement;
		if (selectItemTitle) selectItemTitle.remove();
		selectItemBody.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(selectItem, originalSelect));
		originalSelect.hasAttribute('data-fls-select-search') ? this.searchActions(selectItem) : null;
	}
	// Конструктор значення заголовка
	getSelectTitleValue(selectItem, originalSelect) {
		// Отримуємо вибрані текстові значення
		let selectTitleValue = this.getSelectedOptionsData(originalSelect, 2).html;
		// Обробка значень мультивибору
		// Якщо увімкнено режим тегів (вказано налаштування data-tags)
		if (originalSelect.multiple && originalSelect.hasAttribute('data-fls-select-tags')) {
			selectTitleValue = this.getSelectedOptionsData(originalSelect).elements.map(option => `<span role="button" data-fls-select-id="${selectItem.dataset.flsSelectId}" data-fls-select-value="${option.value}" class="_select-tag">${this.getSelectElementContent(option)}</span>`).join('');
			// Якщо виведення тегів у зовнішній блок
			if (originalSelect.dataset.flsSelectTags && document.querySelector(originalSelect.dataset.flsSelectTags)) {
				document.querySelector(originalSelect.dataset.flsSelectTags).innerHTML = selectTitleValue;
				if (originalSelect.hasAttribute('data-fls-select-search')) selectTitleValue = false;
			}
		}
		// Значення або плейсхолдер
		selectTitleValue = selectTitleValue.length ? selectTitleValue : (originalSelect.dataset.flsSelectPlaceholder ? originalSelect.dataset.flsSelectPlaceholder : '')
		selectTitleValue = selectTitleValue.map(item => item.replace(/"/g, '&quot;'))
		// Якщо увімкнено режим pseudo
		let pseudoAttribute = '';
		let pseudoAttributeClass = '';
		if (originalSelect.hasAttribute('data-fls-select-pseudo-label')) {
			pseudoAttribute = originalSelect.dataset.flsSelectPseudoLabel ? ` data-fls-select-pseudo-label="${originalSelect.dataset.flsSelectPseudoLabel}"` : ` data-fls-select-pseudo-label="Заповніть атрибут"`;
			pseudoAttributeClass = ` ${this.selectClasses.classSelectPseudoLabel}`;
		}
		// Якщо є значення, додаємо клас
		this.getSelectedOptionsData(originalSelect).values.length ? selectItem.classList.add(this.selectClasses.classSelectActive) : selectItem.classList.remove(this.selectClasses.classSelectActive);
		// Повертаємо поле введення для пошуку чи текст
		if (originalSelect.hasAttribute('data-fls-select-search')) {
			// Виводимо поле введення для пошуку
			return `<div class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${selectTitleValue}" data-fls-select-placeholder="${selectTitleValue}" class="${this.selectClasses.classSelectInput}"></span></div>`;
		} else {
			// Якщо вибрано елемент зі своїм класом
			const customClass = this.getSelectedOptionsData(originalSelect).elements.length && this.getSelectedOptionsData(originalSelect).elements[0].dataset.flsSelectClass ? ` ${this.getSelectedOptionsData(originalSelect).elements[0].dataset.flsSelectClass}` : '';
			// Виводимо текстове значення
			return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span${pseudoAttribute} class="${this.selectClasses.classSelectValue}${pseudoAttributeClass}"><span class="${this.selectClasses.classSelectContent}${customClass}">${selectTitleValue}</span></span></button>`;
		}
	}
	// Конструктор даних для значення заголовка
	getSelectElementContent(selectOption) {
		// Якщо для елемента вказано виведення картинки чи тексту, перебудовуємо конструкцію
		const selectOptionData = selectOption.dataset.flsSelectAsset ? `${selectOption.dataset.flsSelectAsset}` : '';
		const selectOptionDataHTML = selectOptionData.indexOf('img') >= 0 ? `<img src="${selectOptionData}" alt="">` : selectOptionData;
		let selectOptionContentHTML = ``;
		selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectRow}">` : '';
		selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectData}">` : '';
		selectOptionContentHTML += selectOptionData ? selectOptionDataHTML : '';
		selectOptionContentHTML += selectOptionData ? `</span>` : '';
		selectOptionContentHTML += selectOptionData ? `<span class="${this.selectClasses.classSelectText}">` : '';
		selectOptionContentHTML += selectOption.textContent;
		selectOptionContentHTML += selectOptionData ? `</span>` : '';
		selectOptionContentHTML += selectOptionData ? `</span>` : '';
		return selectOptionContentHTML;
	}
	// Отримання даних плейсхолдера
	getSelectPlaceholder(originalSelect) {
		const selectPlaceholder = Array.from(originalSelect.options).find(option => !option.value);
		if (selectPlaceholder) {
			return {
				value: selectPlaceholder.textContent,
				show: selectPlaceholder.hasAttribute("data-fls-select-show"),
				label: {
					show: selectPlaceholder.hasAttribute("data-fls-select-label"),
					text: selectPlaceholder.dataset.flsSelectLabel
				}
			}
		}
	}
	// Отримання даних із вибраних елементів
	getSelectedOptionsData(originalSelect, type) {
		//Отримуємо всі вибрані об'єкти з select
		let selectedOptions = [];
		if (originalSelect.multiple) {
			// Якщо мультивибір
			// Забираємо плейсхолдер, отримуємо решту вибраних елементів
			selectedOptions = Array.from(originalSelect.options).filter(option => option.value).filter(option => option.selected);
		} else {
			// Якщо одиничний вибір
			selectedOptions.push(originalSelect.options[originalSelect.selectedIndex]);
		}
		return {
			elements: selectedOptions.map(option => option),
			values: selectedOptions.filter(option => option.value).map(option => option.value),
			html: selectedOptions.map(option => this.getSelectElementContent(option))
		}
	}
	// Конструктор елементів списку
	getOptions(originalSelect) {
		// Налаштування скролла елементів
		const selectOptionsScroll = originalSelect.hasAttribute('data-fls-select-scroll') ? `` : '';
		const customMaxHeightValue = +originalSelect.dataset.flsSelectScroll ? +originalSelect.dataset.flsSelectScroll : null;
		// Отримуємо елементи списку
		let selectOptions = Array.from(originalSelect.options);
		if (selectOptions.length > 0) {
			let selectOptionsHTML = ``;
			// Якщо вказано налаштування data-fls-select-show, показуємо плейсхолдер у списку
			if ((this.getSelectPlaceholder(originalSelect) && !this.getSelectPlaceholder(originalSelect).show) || originalSelect.multiple) {
				selectOptions = selectOptions.filter(option => option.value);
			}
			// Будуємо та виводимо основну конструкцію
			selectOptionsHTML += `<div ${selectOptionsScroll} ${selectOptionsScroll ? `style="max-height: ${customMaxHeightValue}px"` : ''} class="${this.selectClasses.classSelectOptionsScroll}">`;
			selectOptions.forEach(selectOption => {
				// Отримуємо конструкцію конкретного елемента списку
				selectOptionsHTML += this.getOption(selectOption, originalSelect);
			});
			selectOptionsHTML += `</div>`;
			return selectOptionsHTML;
		}
	}
	// Конструктор конкретного елемента списку
	getOption(selectOption, originalSelect) {
		// Якщо елемент вибрано та увімкнено режим мультивибору, додаємо клас
		const selectOptionSelected = selectOption.selected && originalSelect.multiple ? ` ${this.selectClasses.classSelectOptionSelected}` : '';
		// Якщо елемент вибраний і немає налаштування data-fls-select-show-selected, приховуємо елемент
		const selectOptionHide = selectOption.selected && !originalSelect.hasAttribute('data-fls-select-show-selected') && !originalSelect.multiple ? `hidden` : ``;
		// Якщо для елемента зазначений клас додаємо
		const selectOptionClass = selectOption.dataset.flsSelectClass ? ` ${selectOption.dataset.flsSelectClass}` : '';
		// Якщо вказано режим посилання
		const selectOptionLink = selectOption.dataset.flsSelectHref ? selectOption.dataset.flsSelectHref : false;
		const selectOptionLinkTarget = selectOption.hasAttribute('data-fls-select-href-blank') ? `target="_blank"` : '';
		// Будуємо та повертаємо конструкцію елемента
		let selectOptionHTML = ``;
		selectOptionHTML += selectOptionLink ? `<a ${selectOptionLinkTarget} ${selectOptionHide} href="${selectOptionLink}" data-fls-select-value="${selectOption.value}" class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}">` : `<button ${selectOptionHide} class="${this.selectClasses.classSelectOption}${selectOptionClass}${selectOptionSelected}" data-fls-select-value="${selectOption.value}" type="button">`;
		selectOptionHTML += this.getSelectElementContent(selectOption);
		selectOptionHTML += selectOptionLink ? `</a>` : `</button>`;
		return selectOptionHTML;
	}
	// Сеттер елементів списку (options)
	setOptions(selectItem, originalSelect) {
		// Отримуємо об'єкт тіла псевдоселекту
		const selectItemOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
		// Запускаємо конструктор елементів списку (options) та додаємо в тіло псевдоселекту
		selectItemOptions.innerHTML = this.getOptions(originalSelect);
	}
	// Визначаємо, де видобразити випадаючий список
	setOptionsPosition(selectItem) {
		const originalSelect = this.getSelectElement(selectItem).originalSelect;
		const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
		const selectItemScroll = this.getSelectElement(selectItem, this.selectClasses.classSelectOptionsScroll).selectElement;
		const customMaxHeightValue = +originalSelect.dataset.flsSelectScroll ? `${+originalSelect.dataset.flsSelectScroll}px` : ``;
		const selectOptionsPosMargin = +originalSelect.dataset.flsSelectOptionsMargin ? +originalSelect.dataset.flsSelectOptionsMargin : 10;

		if (!selectItem.classList.contains(this.selectClasses.classSelectOpen)) {
			selectOptions.hidden = false;
			const selectItemScrollHeight = selectItemScroll.offsetHeight ? selectItemScroll.offsetHeight : parseInt(window.getComputedStyle(selectItemScroll).getPropertyValue('max-height'));
			const selectOptionsHeight = selectOptions.offsetHeight > selectItemScrollHeight ? selectOptions.offsetHeight : selectItemScrollHeight + selectOptions.offsetHeight;
			const selectOptionsScrollHeight = selectOptionsHeight - selectItemScrollHeight;
			selectOptions.hidden = true;

			const selectItemHeight = selectItem.offsetHeight;
			const selectItemPos = selectItem.getBoundingClientRect().top;
			const selectItemTotal = selectItemPos + selectOptionsHeight + selectItemHeight + selectOptionsScrollHeight;
			const selectItemResult = window.innerHeight - (selectItemTotal + selectOptionsPosMargin);

			if (selectItemResult < 0) {
				const newMaxHeightValue = selectOptionsHeight + selectItemResult;
				if (newMaxHeightValue < 100) {
					selectItem.classList.add('select--show-top');
					selectItemScroll.style.maxHeight = selectItemPos < selectOptionsHeight ? `${selectItemPos - (selectOptionsHeight - selectItemPos)}px` : customMaxHeightValue;
				} else {
					selectItem.classList.remove('select--show-top');
					selectItemScroll.style.maxHeight = `${newMaxHeightValue}px`;
				}
			}
		} else {
			setTimeout(() => {
				selectItem.classList.remove('select--show-top');
				selectItemScroll.style.maxHeight = customMaxHeightValue;
			}, +originalSelect.dataset.flsSelectSpeed);
		}
	}
	// Обробник кліку на пункт списку
	optionAction(selectItem, originalSelect, optionItem) {
		const selectOptions = selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOptions)}`);
		if (!selectOptions.classList.contains('_slide')) {
			if (originalSelect.multiple) { // Якщо мультивибір
				// Виділяємо класом елемент
				optionItem.classList.toggle(this.selectClasses.classSelectOptionSelected);
				// Очищаємо вибрані елементи
				const originalSelectSelectedItems = this.getSelectedOptionsData(originalSelect).elements;
				originalSelectSelectedItems.forEach(originalSelectSelectedItem => {
					originalSelectSelectedItem.removeAttribute('selected');
				});
				// Вибираємо елементи 
				const selectSelectedItems = selectItem.querySelectorAll(this.getSelectClass(this.selectClasses.classSelectOptionSelected));
				selectSelectedItems.forEach(selectSelectedItems => {
					originalSelect.querySelector(`option[value = "${selectSelectedItems.dataset.flsSelectValue}"]`).setAttribute('selected', 'selected');
				});
			} else { // Якщо одиничний вибір
				// Якщо не вказано налаштування data-fls-select-show-selected, приховуємо вибраний елемент
				if (!originalSelect.hasAttribute('data-fls-select-show-selected')) {
					setTimeout(() => {
						// Спочатку все показати
						if (selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`)) {
							selectItem.querySelector(`${this.getSelectClass(this.selectClasses.classSelectOption)}[hidden]`).hidden = false;
						}
						// Приховуємо вибрану
						optionItem.hidden = true;
					}, this.config.speed);
				}
				originalSelect.value = optionItem.hasAttribute('data-fls-select-value') ? optionItem.dataset.flsSelectValue : optionItem.textContent;
				this.selectAction(selectItem);
			}
			//Оновлюємо заголовок селекту
			this.setSelectTitleValue(selectItem, originalSelect);
			// Викликаємо реакцію на зміну селекту
			this.setSelectChange(originalSelect);
		}
	}
	// Реакція на зміну оригінального select
	selectChange(e) {
		const originalSelect = e.target;
		this.selectBuild(originalSelect);
		this.setSelectChange(originalSelect);
	}
	// Обробник зміни у селекті
	setSelectChange(originalSelect) {
		// Миттєва валідація селекту
		if (originalSelect.hasAttribute('data-fls-select-validate')) {
			formValidate.validateInput(originalSelect)
		}
		// При зміні селекту надсилаємо форму
		if (originalSelect.hasAttribute('data-fls-select-submit') && originalSelect.value) {
			let tempButton = document.createElement("button");
			tempButton.type = "submit";
			originalSelect.closest('form').append(tempButton);
			tempButton.click();
			tempButton.remove();
		}
		const selectItem = originalSelect.parentElement;
		// Виклик коллбек функції
		this.selectCallback(selectItem, originalSelect);
	}
	// Обробник disabled
	selectDisabled(selectItem, originalSelect) {
		if (originalSelect.disabled) {
			selectItem.classList.add(this.selectClasses.classSelectDisabled);
			this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = true;
		} else {
			selectItem.classList.remove(this.selectClasses.classSelectDisabled);
			this.getSelectElement(selectItem, this.selectClasses.classSelectTitle).selectElement.disabled = false;
		}
	}
	// Обробник пошуку за елементами списку
	searchActions(selectItem) {
		const originalSelect = this.getSelectElement(selectItem).originalSelect;
		const selectInput = this.getSelectElement(selectItem, this.selectClasses.classSelectInput).selectElement;
		const selectOptions = this.getSelectElement(selectItem, this.selectClasses.classSelectOptions).selectElement;
		const selectOptionsItems = selectOptions.querySelectorAll(`.${this.selectClasses.classSelectOption} `);
		const _this = this;
		selectInput.addEventListener("input", function () {
			selectOptionsItems.forEach(selectOptionsItem => {
				if (selectOptionsItem.textContent.toUpperCase().includes(selectInput.value.toUpperCase())) {
					selectOptionsItem.hidden = false;
				} else {
					selectOptionsItem.hidden = true;
				}
			});
			// Якщо список закритий відкриваємо
			selectOptions.hidden === true ? _this.selectAction(selectItem) : null;
		});
	}
	// Коллбек функція
	selectCallback(selectItem, originalSelect) {
		document.dispatchEvent(new CustomEvent("selectCallback", {
			detail: {
				select: originalSelect
			}
		}));
	}
}
document.querySelector('select[data-fls-select]') ?
	window.addEventListener('load', window.flsSelect = new SelectConstructor({})) : null
