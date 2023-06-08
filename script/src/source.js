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
  let link = document.getElementById("inputVideoLink").value;
  let genre = document.getElementById("genre").value;
  let isComplete = document.getElementById("inputVideoIsComplete").checked;
  
  // check apakah ada kalimat di string
  if (!link.toUpperCase().includes('www.youtube.com/watch?v='.toUpperCase()) && !link.toUpperCase().includes('www.youtu.be/watch?v='.toLowerCase())) {
    alert("Masukan link yang benar");
  } else if (videoList.length > 10) {
    alert("Memori tidak cukup Harap hapus beberapa video agar bisa input lagi");
  } else {
    let splittedLink = link.split('v=');
    let [ , channelCode ] = splittedLink;
    let codeVideo = channelCode.split('&');
    let linkFix = `https://www.youtube.com/embed/${codeVideo[0]}`
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
function findVideoIndex(videoId) {
  for (const index in videoList) {
      if (videoList[index].id === videoId) {
          return index;
      }
  }
  return -1;
}

function findVideos(videoId) {
  for (const bookItem of videoList) {
      if (bookItem.id === videoId) {
          return bookItem;
      }
  }
  return null;
}

function removeVideoFromCompleted(videoId) {
  const videoTarget = findVideoIndex(videoId);

  if (videoTarget === -1) return;

  videoList.splice(videoTarget, 1);
  document.dispatchEvent(new Event(RENDER_VIDEOS));
}

function undoBooksFromCompleted(videoId) {
  const videoTarget = findVideos(videoId);

  if (videoTarget == null) return;

  videoTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_VIDEOS));
}

function addVideoToComplete (videoId) {
  const videoTarget = findBooks(videoId);

  if (videoTarget == null) return;

  videoTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_VIDEOS));
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
// function removeVideoItemWithId(videoList, id) {
//   return videoList.filter((obj) => obj.id !== id);
// }

export { videoList, RENDER_VIDEOS, takeInputVideo, removeVideoFromCompleted, undoBooksFromCompleted, addVideoToComplete };
// export default takeInputVideo();
// expor