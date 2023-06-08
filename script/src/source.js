const videoList = [{
  id: 122222,
  title: 'Jokowi Cover AI Komang',
  titleClass: 'JokowiCoverAIKomang',
  genre: 'Japanese',
  link: 'https://www.youtube.com/embed/M1pH5xr9u7Q',
  isComplete: true
},
{
  id: 123456,
  title: 'No Time To Die',
  titleClass: 'NoTimeToDie',
  genre: 'Drama',
  link: 'https://www.youtube.com/embed/Og2vYP7VzUs',
  isComplete: false
}];

const RENDER_VIDEOS = "render-sammhub";

// untuk generate id berdasarkan tanggal sekarang
function generateId() {
return +new Date();
}

// Untuk generate object
function generateSammhubObject(id, title, titleClass, genre, link, isComplete) {
return {
  id,
  title,
  titleClass,
  genre,
  link,
  isComplete,
};
}

// Fungsi No.1 Untuk mengambil value dari html
function takeInputVideo() {
  let title = document.getElementById("inputVideoTitle").value.trim();
  let titleClass = title.replace(/\s/g, "");
  let genre = document.getElementById("genre").value;
  let link = document.getElementById("inputVideoLink").value.trim();
  let splittedLink = link.split('v=');
  let [ , channelCode ] = splittedLink;
  let codeVideo = channelCode.split('&');
  let linkFix = `https://www.youtube.com/embed/${codeVideo}`
  let isComplete = document.getElementById("inputVideoIsComplete").checked;

  // check apakah ada kalimat di string
  let check1 = /youtu.be/.test(link.toLowerCase());
  let check2 = /youtube.com/.test(link.toLowerCase());

  if (!check1 && !check2) {
    alert("Masukan link yang benar");
  } else if (videoList.length > 10) {
    alert("Memori tidak cukup Harap hapus beberapa video agar bisa input lagi");
  } else {
  // objek sementara untuk menyimpan
  let videoItem = generateSammhubObject(
    generateId(),
    title,
    titleClass,
    genre,
    linkFix,
    isComplete
  );

  videoList.push(videoItem)
  }

  document.dispatchEvent(new Event(RENDER_VIDEOS));
}
/* contoh Output

{
id: uid,
title: 'James Bond',
titleClass: 'JamesBond',
genre: 'Humour',
link: 'https',
isComplete: false,
}

*/



// Fungsi no.2 mengganti value isComplete pada database videoList
function changeIsComplete(videoList, id, isComplete) {
  let videoCopy = Array.from(videoList);
  for (const videoItem of videoCopy) {
    if (videoItem.id === id) {
      videoItem.isComplete = isComplete;
      break;
    }
  }
  return videoCopy;
}

/* contoh
input:
changeIsComplete(videoList, id, true)

class adalah class div dimana button di click

id = class.replace(/book-/g, "")

Output:

{
id: uid,
title: 'James Bond',
titleClass: 'JamesBond',
genre: 'Humour',
link: 'https',
isComplete: true,
}

*/

// Fungsi Delete videoItem from videoList dengan id
// memfilter id object yang ingin dihilangkan
//
function removeVideoItemWithId(videoList, id) {
  return videoList.filter((obj) => obj.id !== id);
}

export { videoList, RENDER_VIDEOS, takeInputVideo, changeIsComplete, removeVideoItemWithId };
// export default takeInputVideo();
// expor