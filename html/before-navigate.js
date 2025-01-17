const args=new URLSearchParams(location.search)
if(args.has("target"))
{
	let span=document.querySelector("[data-message='beforeNavigateDestination']")
	span.innerHTML=span.innerHTML.replace("%",'<a></a>')
	let a=span.querySelector("a")
	a.textContent=a.href=args.get("target")
	brws.storage.sync.get(["navigation_delay"],res=>{
		let secondsLeft=res.navigation_delay
		if(secondsLeft<61)
		{
			const div=document.getElementById("timer"),
			timer=setInterval(()=>{
				secondsLeft--
				tick()
			},1000),
			p=div.querySelector("p"),
			tick=()=>{
				if(secondsLeft<=0)
				{
					location.href=args.get("target")
					clearInterval(timer)
				}
				if(secondsLeft==1)
				{
					p.textContent=brws.i18n.getMessage("beforeNavigateTimerSingular")
				}
				else
				{
					p.textContent=brws.i18n.getMessage("beforeNavigateTimer").replace("%",secondsLeft)
				}
			}
			div.style.display="block"
			tick()
		}
	})
}
else
{
	history.back()
}
