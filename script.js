//Slide
let quoteList = [
  {
    quote: "All the world’s a stage, and all the men and women merely players.",
    author: "William Shakespeare",
    age: 68,
    imgPath: "./assets/img/slide1.png",
  },
  {
    quote: "The purpose of our lives is to be happy.",
    author: "Dalai Lama",
    age: 68,
    imgPath: "./assets/img/slide2.png",
  },
  {
    quote:
      "Many of life’s failures are people who did not realize how close they were to success when they gave up.",
    author: "Thomas A. Edison",
    age: 68,
    imgPath: "./assets/img/slide3.png",
  },
  {
    quote: "Don’t cry because it’s over, smile because it happened",
    author: "Dr. Seuss",
    age: 68,
    imgPath: "./assets/img/slide4.png",
  },
];

window.onload = () => {
  if (!localStorage.getItem("quotes")) {
    localStorage.setItem("quotes", JSON.stringify(quoteList));
  }
  renderSlide(0);
  renderPreviewSlide(0);
};

function renderSlide(slideIndex) {
  let quotes = JSON.parse(localStorage.getItem("quotes"));
  const slide = document.querySelector(".slide");
  let html = `
            <img src="${quotes[slideIndex].imgPath}" alt="" class="slide__img">
            <div class="slide__content">
                <p class="slide__content-quote">
                    “${quotes[slideIndex].quote}”
                </p>
                <div class="slide__content-author">${quotes[slideIndex].author} - Age: ${quotes[slideIndex].age}</div>
            </div>
    `;
  slide.innerHTML = html;
}

function renderPreviewSlide(slideIndex) {
  const slidePreviewList = document.querySelector(".slide-list");
  let quotes = JSON.parse(localStorage.getItem("quotes"));
  let htmls = quotes.map(
    (quote, index) => `
    <div class="slide__item" onclick='handleChangeSlide(${index})'>
    <img src="${quote.imgPath}" alt="" class="slide__item-img ${
      slideIndex === index ? "slide__item-img--active" : ""
    }">
    <i class="fas fa-trash-alt delete-icon" onclick='handleDeleteSlide(${index})'></i>
    </div>
    `
  );
  slidePreviewList.innerHTML = htmls.join("");

  const navBtns = document.querySelector(".nav__panigation");
  htmls = quotes.map(
    (quote, index) => `
        <label class="container" onclick='handleChangeSlide(${index})'>
            <input type="radio" name="radio" ${
              index === slideIndex && "checked"
            }>
            <span class="checkMark"></span>
        </label>
    `
  );
  navBtns.innerHTML = htmls.join("");

  const navArrows = document.querySelector(".nav__arrow");

  navArrows.innerHTML = `
        <img src="./assets/img/Arrow-left.svg" alt="" class="arrow-item" onclick='handleChangeSlide(${
          slideIndex - 1 < 0 ? quotes.length - 1 : slideIndex - 1
        })'>
        <img src="./assets/img/Arrow-right.svg" alt="" class="arrow-item" onclick='handleChangeSlide(${
          slideIndex + 1 > quotes.length - 1 ? 0 : slideIndex + 1
        })'>
    `;
}

function handleChangeSlide(slideIndex) {
  renderSlide(slideIndex);
  renderPreviewSlide(slideIndex);
}

function handleDeleteSlide(id) {
  let quotes = JSON.parse(localStorage.getItem("quotes"));
  if (quotes.length == 1) return;
  quotes.splice(id, 1);
  localStorage.setItem("quotes", JSON.stringify(quotes));
  renderSlide(0);
  renderPreviewSlide(0);
}

//Validate form
//Author Name
const inputAuthorName = document.querySelector("#author-name");
const msgAuthorName = document.querySelector(".author-name__msg");
//Quote
const inputQuote = document.querySelector("#quote");
const msgQuote = document.querySelector(".quote__msg");
//File
const inputFileImg = document.querySelector("#img-file");
const displayImgPreview = document.querySelector(".preview-img");
//Age
const inputAuthorAge = document.querySelector("#author-age");
const msgAuthorAge = document.querySelector(".author-age__msg");

const btnSubmit = document.querySelector(".submit-form");
let saveImgPath;

function handleAddSlide() {
  let quotes = JSON.parse(localStorage.getItem("quotes"));
  quotes = [
    ...quotes,
    {
      quote: inputQuote.value,
      author: inputAuthorName.value,
      age: Number(inputAuthorAge.value),
      imgPath: saveImgPath,
    },
  ];
  localStorage.setItem("quotes", JSON.stringify(quotes));
  inputQuote.value = "";
  inputFileImg.value = "";
  inputAuthorName.value = "";
  inputAuthorAge.value = "";
  document.querySelector(".img-file-label").innerHTML = "Add file";
  displayImgPreview.src = quotes[0].imgPath;
  renderSlide(0);
  renderPreviewSlide(0);
}
function validateLength(value) {
  if (value.trim().split(" ").length < 3 && value.length > 0) return false;
  else return true;
}
function validateNumber(value) {
  if (value < 0 || value > 100) return false;
  else return true;
}
inputAuthorName.addEventListener("input", (e) => {
  if (
    e.target.value.trim().split(" ").length < 3 &&
    e.target.value.length > 0
  ) {
    inputAuthorName.classList.add("error");
    msgAuthorName.textContent = "Tên hơn 3 từ";
  } else {
    inputAuthorName.classList.remove("error");
    msgAuthorName.textContent = "";
  }
});

inputQuote.addEventListener("input", (e) => {
  if (
    e.target.value.trim().split(" ").length < 3 &&
    e.target.value.length > 0
  ) {
    inputQuote.classList.add("error");
    msgQuote.textContent = "Quote hơn 3 từ";
  } else {
    inputQuote.classList.remove("error");
    msgQuote.textContent = "";
  }
});
inputAuthorAge.addEventListener("input", (e) => {
  if (Number(e.target.value) < 0 || Number(e.target.value > 100)) {
    inputAuthorAge.classList.add("error");
    msgAuthorAge.textContent = "Sai lệch số tuổi quy định";
  } else {
    inputAuthorAge.classList.remove("error");
    msgAuthorAge.textContent = "";
  }
});

inputFileImg.addEventListener("change", function (e) {
  const files = e.target.files[0];
  if (!files.type.match("image")) return;
  saveImgPath = URL.createObjectURL(files);
  displayImgPreview.src = saveImgPath;
  document.querySelector(".img-file-label").innerHTML =
    inputFileImg.value.substring(inputFileImg.value.lastIndexOf("\\") + 1);
});

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    validateLength(inputQuote.value) &&
    validateLength(inputAuthorName.value) &&
    validateNumber(Number(inputAuthorAge.value))
  ) {
    handleAddSlide();
  }
});
