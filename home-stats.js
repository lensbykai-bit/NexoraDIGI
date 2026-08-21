document.addEventListener('DOMContentLoaded',()=>{
  const counters=[...document.querySelectorAll('[data-counter]')];
  if(!counters.length)return;

  const formatCompact=value=>{
    if(value>=1000000)return (value/1000000).toFixed(value>=10000000?0:1).replace(/\.0$/,'')+'M+';
    if(value>=1000)return (value/1000).toFixed(value>=10000?1:1).replace(/\.0$/,'')+'K+';
    return Math.round(value).toLocaleString()+'+';
  };

  const animate=el=>{
    if(el.dataset.animated==='true')return;
    el.dataset.animated='true';
    const target=Number(el.dataset.counter||0);
    const duration=1800;
    const start=performance.now();
    const tick=now=>{
      const progress=Math.min((now-start)/duration,1);
      const eased=1-Math.pow(1-progress,3);
      el.textContent=formatCompact(target*eased);
      if(progress<1)requestAnimationFrame(tick);
      else el.textContent=formatCompact(target);
    };
    requestAnimationFrame(tick);
  };

  if('IntersectionObserver' in window){
    const observer=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){animate(entry.target);observer.unobserve(entry.target)}
      });
    },{threshold:.35});
    counters.forEach(el=>observer.observe(el));
  }else counters.forEach(animate);
});
