/*zhp 站点运行时间 */
function siteTime() {
    let seconds = 1000;
    let minutes = 60000;
    let hours = 3600000;
    let days = 86400000;
    let years = 31536000000;
    let diff = new Date() - new Date('12/31/2022 00:00:00');
    // let diffYears = Math.floor(diff / years);
    let diffDays = Math.floor(diff / days);
    let diffHours = Math.floor((diff%days)/hours);
    let diffMinutes = Math.floor((diff%hours) / minutes);
    let diffSeconds = Math.floor((diff%minutes) / seconds);
    let runbox = document.getElementById('run-time');
    runbox.innerHTML = '本站已运行<i class="far fa-clock fa-fw"></i> ' +
        ((diffDays < 10) ? '0' : '') + diffDays + ' 天 ' +
        ((diffHours < 10) ? '0' : '') + diffHours + ' 时 ' +
        ((diffMinutes < 10) ? '0' : '') + diffMinutes + ' 分 ' +
        ((diffSeconds < 10) ? '0' : '') + diffSeconds + ' 秒 ';
}
setInterval(siteTime, 1000);