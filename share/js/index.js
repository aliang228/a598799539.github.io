let pattern = 'pc'



function patternFun() {
    var Width = window.innerWidth //浏览器窗口的内部宽度（包括滚动条）

        ||
        document.documentElement.clientWidth

        ||
        document.body.clientWidth;

    if (Width > 620) {
        pattern = 'pc'
        var app = document.getElementsByClassName("app");
        var pc = document.getElementsByClassName("pc");
        var mores = document.querySelectorAll(".more");
        var more_text = document.querySelectorAll("#more_text");
        for (let i = 0; i < more_text.length; i++) {
          more_text[i].classList.remove("liuHang");
        }
        for (let i = 0; i < mores.length; i++) {
            mores[i].classList.remove("moreXias");
        }
        var more = document.querySelectorAll("#more");
        for (let i = 0; i < more.length; i++) {
          more[i].classList.remove("moreXia");
        }
        for (let i = 0; i < app.length; i++) {
            app[i].classList.remove("containerstext");
        }
        for (let i = 0; i < pc.length; i++) {
            pc[i].classList.add("containers");
        }
    } else {
        pattern = 'app'


        var app = document.getElementsByClassName("app");
        var pc = document.getElementsByClassName("pc");
        var mores = document.querySelectorAll(".more");
        var more_text = document.querySelectorAll("#more_text");
        for (let i = 0; i < more_text.length; i++) {
          more_text[i].classList.add("liuHang");
        }
        for (let i = 0; i < mores.length; i++) {
            mores[i].classList.add("moreXias");
        }
        var more = document.querySelectorAll("#more");
        for (let i = 0; i < more.length; i++) {
          more[i].classList.remove("moreXia");
        }
        for (let i = 0; i < app.length; i++) {
            app[i].classList.add("containerstext");
        }
        for (let i = 0; i < pc.length; i++) {
            pc[i].classList.remove("containers");
        }
    }
}

function patternFuns() {
    var Width = window.innerWidth //浏览器窗口的内部宽度（包括滚动条）

        ||
        document.documentElement.clientWidth

        ||
        document.body.clientWidth;
    setTimeout(() => {
        if (Width > 620) {
            pattern = 'pc'
            var app = document.getElementsByClassName("app");
            var pc = document.getElementsByClassName("pc");
            var more_text = document.querySelectorAll("#more_text");
            for (let i = 0; i < more_text.length; i++) {
              more_text[i].classList.remove("liuHang");
            }
            var mores = document.querySelectorAll(".more");
            for (let i = 0; i < mores.length; i++) {
                mores[i].classList.remove("moreXias");
            }
            for (let i = 0; i < app.length; i++) {
                app[i].classList.remove("containerstext");
            }
            for (let i = 0; i < pc.length; i++) {
                pc[i].classList.add("containers");
            }
        } else {
            pattern = 'app'

            console.log(mores);
            var app = document.getElementsByClassName("app");
            var pc = document.getElementsByClassName("pc");
            var mores = document.querySelectorAll(".more");
            var more_text = document.querySelectorAll("#more_text");
        for (let i = 0; i < more_text.length; i++) {
          more_text[i].classList.add("liuHang");
        }
            for (let i = 0; i < mores.length; i++) {
                mores[i].classList.add("moreXias");
            }
            for (let i = 0; i < app.length; i++) {

                app[i].classList.add("containerstext");
            }
            for (let i = 0; i < pc.length; i++) {
                pc[i].classList.remove("containers");
            }
        }
    }, 500)

}

patternFuns()

function show(val) {

    if (pattern == 'pc') {
      if(val[0]=="boxlast"&&val[0]=='boxFirst'){
        return
      }
        let dome = document.getElementById(val[0])
        dome.classList.remove('containers')
        let Sibling = document.getElementById(val[0]).nextElementSibling;
        Sibling.classList.add('moreXia')
    } else {
        let dome = document.getElementById(val[1])
        dome.classList.remove('containerstext')
        let more_text =document.querySelector(`#${val[0]} #more_text`)
        more_text.classList.remove('liuHang')
     

        let Sibling = document.getElementById(val[0]).nextElementSibling;
        Sibling.classList.add('moreXia')  
           Sibling.classList.remove('moreXias')  
        console.log(val,dome);

    }
}
window.onresize = function() {
    var Width = window.innerWidth //浏览器窗口的内部宽度（包括滚动条）

        ||
        document.documentElement.clientWidth

        ||
        document.body.clientWidth;

    var Height = window.innerHeight //浏览器窗口的内部高度（包括滚动条）

        ||
        document.documentElement.clientWidth

        ||
        document.body.clientHeight;

    console.log(Width, Height);
    patternFun()

}