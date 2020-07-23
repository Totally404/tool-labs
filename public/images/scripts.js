var xRange = document.querySelector('#x-range');
var yRange = document.querySelector('#y-range');
var widthRange = document.querySelector('#width-range');
var heightRange = document.querySelector('#height-range');
var color = document.querySelector('#color');

var xNumber = document.querySelector('#x-number');
var yNumber = document.querySelector('#y-number');
var widthNumber = document.querySelector('#width-number');
var heightNumber = document.querySelector('#height-number');
var colorLabel = document.querySelector('#color-label');

var textArea = document.querySelector('#text');

var controlsBack = $('#controls-back');
$(controlsBack).on('click', function (event) {
	$('.controls').addClass('hide');
	$('.elements').removeClass('hide');
})

$(textArea).on('input', function () {
	editContent();
});
$(xRange).on('input', function () {
	xNumber.value = xRange.value;
	editContent();
});
$(yRange).on('input', function () {
	yNumber.value = yRange.value;
	editContent();
});
$(widthRange).on('input', function () {
	widthNumber.value = widthRange.value;
	editContent();
});
$(heightRange).on('input', function () {
	heightNumber.value = heightRange.value;
	editContent();
});
$(color).on('input', function () {
	editContent();
});

$(xNumber).on('input', function () {
	xRange.value = xNumber.value;
	editContent();
});
$(yNumber).on('input', function () {
	yRange.value = yNumber.value;
	editContent();
});
$(widthNumber).on('input', function () {
	widthRange.value = widthNumber.value;
	editContent();
});
$(heightNumber).on('input', function () {
	heightRange.value = heightNumber.value;
	editContent();
});

$('#img-select-btn').on('click', function () {
	$('#img-select').trigger('click');
});

$("#img-select").change(function () {
	if (this.files && this.files[0]) {
		var reader = new FileReader();
		reader.onload = function (e) {
			$('.img-main').attr('src', e.target.result);
		}
		reader.readAsDataURL(this.files[0]);
	}
});

var elementHolder = document.querySelector('.element-holder');
$(elementHolder).on('click', '[data-element]', function (event) {
	contentIndex = $(this).attr('data-element');
	console.log(content[contentIndex]);
	setOptions(content[contentIndex]);
})

var contentIndex = -1;

var contentHolder = document.querySelector('.content-holder');
var content = [];

function setOptions(obj) {
	if (obj.type == 'shader') {
		xRange.value = obj.x;
		yRange.value = obj.y;
		widthRange.value = obj.width;
		heightRange.value = obj.height;
		xNumber.value = obj.x;
		yNumber.value = obj.y;
		widthNumber.value = obj.width;
		heightNumber.value = obj.height;
		color.value = obj.color;
		$('.text-fieldset').addClass('hide')
		$('.shader-fieldset').removeClass('hide')
	}
	else {
		xRange.value = obj.x;
		yRange.value = obj.y;
		xNumber.value = obj.x;
		yNumber.value = obj.y;
		textArea.value = obj.text;
		color.value = obj.color;
		$('.text-fieldset').removeClass('hide')
		$('.shader-fieldset').addClass('hide')
	}


	$('.controls').removeClass('hide');
	$('.elements').addClass('hide');
}

function addShader(x, y, width, height, color) {
	var html = `<div data-content="${content.length}" style="position: absolute; left: ${x * 100}%; top: ${y * 100}%; width: ${width * 100}%; height: ${height * 100}%; background-color: ${color};">`;
	contentHolder.innerHTML += html;

	var html = `<div data-element="${content.length}">Shader ${content.length}</div>`;
	elementHolder.innerHTML += html;

	content.push({
		x,
		y,
		width,
		height,
		color,
		id: content.length,
		type: 'shader'
	});
}

function editShader() {
	var c = content[contentIndex];
	c.x = xRange.value;
	c.y = yRange.value;
	c.width = widthRange.value;
	c.height = heightRange.value;
	c.color = color.value;

	$(`[data-content="${contentIndex}"]`).css(
		{
			left: `${c.x * 100}%`,
			top: `${c.y * 100}%`,
			width: `${c.width * 100}%`,
			height: `${c.height * 100}%`,
			backgroundColor: `${c.color}`
		}
	);
}

function addText(text, x, y, size, color) {
	var html = `<div data-content="${content.length}" style="position: absolute; left: ${x * 100}%; top: ${y * 100}%; color: ${color}; white-space: pre-line;">${text}</div>`;
	contentHolder.innerHTML += html;

	var html = `<div data-element="${content.length}">Text ${content.length}</div>`;
	elementHolder.innerHTML += html;

	content.push({
		text,
		x,
		y,
		color,
		id: content.length,
		type: 'text'
	});
}

function editText() {
	var c = content[contentIndex];
	c.text = textArea.value;
	c.x = xRange.value;
	c.y = yRange.value;
	c.color = color.value;

	$(`[data-content="${contentIndex}"]`).css(
		{
			left: `${c.x * 100}%`,
			top: `${c.y * 100}%`,
			color: `${c.color}`
		}
	).text(c.text);
}

function editContent() {
	var c = content[contentIndex];
	if (c.type == 'shader') {
		editShader();
	}
	else {
		editText();
	}
}

var shader = $('#add-shader');
$(shader).on('click', function () {
	addShader(
		0.4,
		0.4,
		0.2,
		0.2,
		'#000000FF'
	);
});

var text = $('#add-text');
$(text).on('click', function () {
	addText(
		'Test',
		0.5,
		0.5,
		1,
		'#FFFFFFFF'
	);
});

window.addEventListener('resize', function (event) {
	var img = $('.img-main');
	var root = document.documentElement;
	root.style.setProperty('--img-width', img.width() + "px");
	root.style.setProperty('--img-height', img.height() + "px");
});

// var contentHolder = document.querySelector('.content-holder');
// var content = [];
