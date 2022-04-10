const scaleUpButton = document.querySelector('.scale__control--bigger');
const scaleDownButton = document.querySelector('.scale__control--smaller');
const scaleValue = document.querySelector('.scale__control--value');
const imagePreviewWrap = document.querySelector('.img-upload__preview');
const imagePreview = imagePreviewWrap.querySelector('img');
const radioList = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const sliderInput = document.querySelector('.effect-level__value');


//изменение масштаба изображения
const setImageScale = (val) => {
  imagePreview.style.transform = `scale(${val/100})`;
};

scaleUpButton.addEventListener('click', () => {
  const scaleVal = Number.parseInt(scaleValue.value, 10);
  if (scaleVal <= 75 && scaleVal >= 25) {
    scaleValue.value = `${scaleVal + 25  }%`;
    setImageScale(Number.parseInt(scaleValue.value, 10));
  }
});

scaleDownButton.addEventListener('click', () => {
  const scaleVal = Number.parseInt(scaleValue.value, 10);
  if (scaleVal <= 100 && scaleVal > 25) {
    scaleValue.value = `${scaleVal - 25  }%`;
    setImageScale(Number.parseInt(scaleValue.value, 10));
  }
});


// смена эффектов и слайдер
const hideSliderContainer = (param) => {
  if (param.target.value === 'none') {
    sliderContainer.classList.add('visually-hidden');
  }
};

sliderInput.value = 100;

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const setEffectValue = (buttonEffect) => {
  slider.noUiSlider.on('update', () => {
    sliderInput.value = slider.noUiSlider.get();
    if (buttonEffect === 'chrome') {
      imagePreview.style.filter = `grayscale(${sliderInput.value})`;
    } else if (buttonEffect === 'sepia') {
      imagePreview.style.filter = `sepia(${sliderInput.value})`;
    } else if (buttonEffect === 'marvin') {
      imagePreview.style.filter = `invert(${sliderInput.value}%)`;
    } else if (buttonEffect === 'phobos') {
      imagePreview.style.filter = `blur(${sliderInput.value}px)`;
    } else if (buttonEffect === 'heat') {
      imagePreview.style.filter = `brightness(${sliderInput.value})`;
    } else {
      imagePreview.style.filter = 'none';
    }
  });
};

const setImgEffect = (evt) => {
  if (evt.target.value === 'chrome') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  } else if (evt.target.value === 'sepia') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  } else if (evt.target.value === 'marvin') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    });
  } else if (evt.target.value === 'phobos') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  } else if (evt.target.value === 'heat') {
    slider.noUiSlider.updateOptions({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
  } else {
    slider.noUiSlider.updateOptions({
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    });
  }
};

radioList.addEventListener('change', (evt) => {
  const buttonEffect = evt.target.value;
  const classToAdd = `effects__preview--${buttonEffect}`;
  if (evt.target.checked) {
    if (imagePreview.classList.length > 0 ) {
      const classToRemove = imagePreview.classList[0];
      imagePreview.classList.remove(classToRemove);
    }
    sliderContainer.classList.remove('visually-hidden');
    hideSliderContainer(evt);
    imagePreview.classList.add(classToAdd);
    setImgEffect(evt);
  }
  setEffectValue(buttonEffect);
  //console.log(buttonEffect);
});
