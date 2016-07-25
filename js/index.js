function game(sence){

	this.sence=sence;
	this.letter=["A","B","C","D","E","F","G","H","I","L","J","K","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    this.num=4;
    this.letterArr=[];
    this.speed=3;
    this.leve=10;
    this.score=0;
    this.cw=document.documentElement.clientWidth;
    this.ch=document.documentElement.clientHeight;
    this.getletter(4);
    this.t=null;
  /*  this.play();
    this.end();
*/}

game.prototype.getletter=function(num){
	var that=this;
	function check(let){
		for (var i = 0; i <that.letter.length; i++) {
			if(let==that.letter[i]){
				return true;
				alert(1);
			}
			    return false;
		};
	}
	for (var i = 0; i < num; i++) {
		var img=document.createElement("img");
		var let=this.letter[Math.floor(Math.random()*this.letter.length)];
		while(check(let)){
			 let=this.letter[Math.floor(Math.random()*this.letter.length)];
		}
		img.className=let;
		img.src="img/"+let+".png";
		img.style.cssText="position:absolute;left:"+Math.random()*(this.cw-150)+50+"px;top:"+(+200*Math.random()-50)+"px;";
		this.sence.appendChild(img);
		this.letterArr.push(let);
	};
	//console.log(this.letterArr)
}

game.prototype.play=function(){
	var that=this;
	this.t=setInterval(function(){
		var letters=document.getElementsByTagName("img");
		for (var i = 0; i < letters.length; i++) {
			var ltop=letters[i].offsetTop;
			letters[i].style.top=ltop+that.speed+"px";
			if(ltop>that.ch){
				var shengming=document.getElementsByClassName("leve")[0];
				shengming.innerHTML=that.leve;
				that.leve--;
				console.log(that.leve);
				if(that.leve<=0){
					alert("GAME OVER")
					that.Stop();
					var cx=document.createElement("div");
					cx.style.width="180px";
					cx.style.height="50px";
					cx.style.background="lime";
					cx.style.borderRadius="25px";
					cx.style.position="fixed";
					cx.style.right="50%";
					cx.style.bottom="50px";
					cx.style.marginRight="-100px";
					cx.style.fontSize="30px";
					cx.style.textAlign="center";
					cx.style.lineHeight="50px";
					cx.style.color="#fff";
					cx.style.cursor="pointer";
					cx.innerHTML="重新游戏";
					this.sence.appendChild(cx);
					end.style.display="none";
					cx.onclick=function(){
						location.reload();//重新加载游戏
						end.style.display="block";
						cx.style.display="none";
					}
				}
			var cn=letters[i].className;
				for(var j=0;j<that.letterArr.length;j++){
					if(that.letterArr[j]==cn){
						that.letterArr=that.letterArr.splice(j,1)
					}
				}
				that.sence.removeChild(letters[i]);
				that.getletter(1);//调用新的字母
				letters[i]=null;
			}
		};
	},50)
}

game.prototype.key=function(){
	var that=this;
	document.onkeydown=function(e){
		var ev=e||window.event;
		var k=String.fromCharCode(ev.keyCode);
		var now=that.sence.getElementsByClassName(k);
		if(now.length>0){
			var fenshu=document.getElementsByClassName("score")[0];
			fenshu.innerHTML=that.score;
			that.score+=10;
			if(that.leve<10){
				that.leve++;
				if(that.leve>=10){
					that.leve=10;
				}
				console.dir(that.leve)
			}
			console.dir(that.score);
			if(that.score>=100){
				alert("进入下一关")
				that.score=0;//清空分数
				location.reload();//重新加载游戏
			}
		that.sence.removeChild(now[0]);	
		that.getletter(1);
		for (var i = 0; i < that.letterArr.length; i++) {
			if(that.letterArr[i]==k){
				that.letterArr=that.letterArr.splice(i,1)
			}
		};
		}
		
	}
}

game.prototype.Stop=function(){
	var that=this;
	clearInterval(that.t);
}