// 資料 model
// 事件 Event
// 介面 View

let request = (obj) => {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(obj.method || 'GET', obj.url);
        if (obj.headers) {
            Object.keys(obj.headers).forEach((key) => {
                xhr.setRequestHeader(key, obj.headers[key]);
            });
        }
        xhr.onload = () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(xhr.statusText);
            }
        };
        xhr.onerror = () => reject(xhr.statusText);
        xhr.send(obj.body);
    });
};

request({
        url: 'https://next.json-generator.com/api/json/get/Ek86hdRMr'
    })
    .then((data) => {
        results = JSON.parse(data);

        let dists = [];
        results.forEach(function(element, index) {
            dists[index] = element.CaseLocationDistrict;
        });

        let dists_notRepeat = dists.filter(function(dist, index, array) {
            return array.indexOf(dist) === index;
        });

        dists_notRepeat.forEach(function(dist) {
            let selOpt_html = `<li>${dist}</li>`;
            document.querySelector('.select__option.dist').innerHTML += selOpt_html;
        });

        //types 種類
        let typies = [];
        results.forEach(function(element, index) {
            typies[index] = element.PName;
        });

        let typies_notRepeat = typies.filter(function(type, index, array) {
            return array.indexOf(type) === index;
        });

        typies_notRepeat.forEach(function(type) {
            let selOpt_html = `<li>${type}</li>`;
            var a = document.querySelector('.select__option.type');
            a.innerHTML += selOpt_html;
            console.log(a);
        });

        common_result();
    })
    .catch((error) => {
        console.log(error);
    });

// function common_result() {
//     document.querySelector('.search-result').innerHTML = results[4].DPName;
// }

let click_page;
let everyPage_results = 20;
let buttonPage_total;
let buttonPage;
let buttonPage_add = 4;

function clickPage_result() {

  // 清空資料;
  document.querySelector('.search-result').innerHTML = null;

  /*!!! 計算要取得哪個範圍的資料 !!!*/

  // 1. 假設現在按下第 5 頁，一次顯示 20 筆資料，那 i 就是 (5 - 1) * 20 = 80
  i = (click_page - 1) * everyPage_results;

  // 2. click_page * everyPage_results 為 5 * 20 = 100
  // 3. 如此就是取得索引 80 ~ 99 的資料;
  for(i; i < (click_page * everyPage_results >results.length ? results.length : click_page * everyPage_results); i++) {

    let result_html = `
      <div>
        <article>
          <section class="search-result__time">
            <div class="title">發生時間：</div>
            <p>${results[i].CaseTime.replace("T", " ")}</p>
          </section>
          <section class="search-result__dist">
            <div class="title">受災地區：</div>
            <p>${results[i].CaseLocationDistrict}</p>
          </section>
          <section class="search-result__type">
            <div class="title">災害類型：</div>
            <p>${results[i].PName}</p>
          </section>
          <section class="search-result__address">
            <div class="title">詳細地址：</div>
            <p>${results[i].CaseLocationDescription}</p>
          </section>
          <section class="search-result__desc">
            <div class="title">災情描述：</div>
            <p>${results[i].CaseDescription}</p>
          </section>
          <div class="complete ${results[i].CaseComplete === true ? "yes" : ""}"></div>
          <i class="fas fa-arrow-up"></i>
        </article>
      </div>
    `;

    document.querySelector('.search-result').innerHTML = result_html;
  }

  // if($(window).width() < 620)
  //   $(window).scrollTop(472);
  // else
  //   $(window).scrollTop(212);
}

/*------
  資料結果、頁碼按鈕動態更新
------*/
function common_result() {
  // 1. 先移除所有資料結果
  document.querySelector('.search-result').innerHTML = null;

  var removeBTN = document.querySelector('button[data-num');
  removeBTN.parentNode.removeChild(removeBTN);

  document.querySelector('.search-info__summary span').innerText = results.length;

  setTimeout(function() {
    for (
      i = 0;
      i <
      (results.length > everyPage_results
       ? everyPage_results
       : results.length);
      i++
    ) {
      let result_html = `
        <div>
          <article>
            <section class="search-result__time">
              <div class="title">發生時間：</div>
              <p>${results[i].CaseTime.replace("T", " ")}</p>
            </section>
            <section class="search-result__dist">
              <div class="title">受災地區：</div>
              <p>${results[i].CaseLocationDistrict}</p>
            </section>
            <section class="search-result__type">
              <div class="title">災害類型：</div>
              <p>${results[i].PName}</p>
            </section>
            <section class="search-result__address">
              <div class="title">詳細地址：</div>
              <p>${results[i].CaseLocationDescription}</p>
            </section>
            <section class="search-result__desc">
              <div class="title">災情描述：</div>
              <p>${results[i].CaseDescription}</p>
            </section>
            <div class="complete ${
                  results[i].CaseComplete === true ? "yes" : ""
                  }"></div>
            <i class="fas fa-arrow-up"></i>
          </article>
        </div>
      `;

        document.querySelector('.search-result').innerHTML = result_html;
    }


    buttonPage_total = Math.ceil(results.length / everyPage_results);


    for (
      buttonPage = 0;
      buttonPage <
      (buttonPage_total >= buttonPage_add ? buttonPage_add : buttonPage_total);
      buttonPage++
    ) {
      let button_html = `
<button data-num="${buttonPage + 1}">${buttonPage + 1}</button>
`;
      let pagination = document.querySelector('.pagination');
      let buttonNext = document.querySelector('button.next');
      pagination.insertBefore(button_html,buttonNext);
      // $("button.next").before(button_html);

      document.querySelector('button[data-num='1']').classList.add("active");
      // $("button[data-num='1']").addClass("active");

      document.querySelector('button.prev').classList.add("disabled");

      if (buttonPage_total === 0 || buttonPage_total === 1)
        document.querySelector('button.next').classList.add("disabled");
      else {
        document.querySelector('button.prev').classList.remove("disabled");
      }
    }
  }, 100);
}

$(".select__option").on("click", "li", function() {

  let selDisplay = $(this).parent().prev();

  selDisplay.text($(this).text());

  $(this).siblings(".active").removeClass("active");
  $(this).addClass("active");

  $(this).parent().addClass("hide");

  // 取得 "select__display" 上的文字;
  let selDist = $(".select__display.dist").text();
  let selType = $(".select__display.type").text();
  let selComplete = $(".select__display.complete").text();

  // 1.篩選出符合使用者所選「受災地區」(dist)的資料
  typhoon_data = typhoon_origin.filter(function(item) {
    if (selDist !== "所有受災地區") {
      return item.CaseLocationDistrict === selDist;
    } else {
      // 如果讀者沒篩選，那就回傳原本的資料;
      return typhoon_origin;
    }
  });

  // 2.從被地區篩選的資料，再篩選出符合使用者所選「災害類型」(type)的資料
  typhoon_data = typhoon_data.filter(function(item) {
    if (selType !== "- 請選擇災害類型 -" && selType !== "所有災害類型") {
      return item.PName === selType;
    } else {
      // 如果使用者沒篩選，那就回傳原本的資料;
      return typhoon_data;
    }
  });

  // 3.從被地區、類型篩選的資料，再篩選出符合使用者所選「是否完成」(complete)的資料;
  typhoon_data = typhoon_data.filter(function(item) {

    if (selComplete !== "- 請選擇是否完成 -" && selComplete !== "無") {

      // 右半邊：如果使用者選「已經處理完成」，回傳 true；否則回傳 false;
      return (
        item.CaseComplete === (selComplete === "已經處理完成" ? true : false)
      );
    } else {

      // 如果使用者沒篩選，那就回傳原本的資料;
      return typhoon_data;
    }
  });

  common_result();
});


///------------------------------------////
var divs = document.querySelectorAll('.select__display');
[...divs].forEach((div) => {
    div.addEventListener(
        'click',
        (e) => {
            var selOpt = e.target.nextElementSibling;
            console.log(e.target);
            if (!selOpt.classList.contains('hide')) {
                selOpt.classList.add('hide');
                e.target.classList.remove('rotate');
            } else {
                selOpt.classList.add('hide');
                selOpt.classList.remove('hide');
                e.target.classList.remove('rotate');
                e.target.classList.add('rotate');
            }
        },
        false
    );
});

$(".select__option.type, .select__option.complete").one("click", "li", function() {
    $(this).parent().prev().removeClass("placeholder");
  }
);
