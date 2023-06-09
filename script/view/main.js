import { videoList, RENDER_VIDEOS, takeInputVideo, removeVideoFromCompleted, undoBooksFromCompleted, addVideoToComplete } from "../src/source.js";

function makeVideo(videoObject) {
    const undo = 'Not Yet Watched';
    const alreadyWatched = 'Already Watched'
    const deletes = 'Delete Video'

    const videoTitle = document.createElement('h3');
    videoTitle.innerText = videoObject.title;

    const videoGenre = document.createElement('p');
    videoGenre.innerText = videoObject.genre;

    const videoLink = document.createElement('button');
    videoLink.setAttribute('id', 'playButton');
    videoLink.innerHTML = `
        <i class="fa-solid fa-play">
        </i>`

    videoLink.addEventListener('click', function(e) {
        e.preventDefault();
        const embedVid = document.getElementById('embedded-video');

        embedVid.innerHTML = `
            <iframe id="video-playing" src="${videoObject.link}" width="80%" height="100%" allow="autoplay" allowfullscreen>
            </iframe>`;

        addVideoToComplete(videoObject.id);
    })


    const videoContainer = document.createElement('div');
    videoContainer.classList.add(`book-${videoObject.id}`);
    videoContainer.append(videoTitle, videoGenre, videoLink);

    const container = document.createElement('article');
    container.setAttribute('id', `video-${videoObject.titleClass}`);
    container.classList.add(`${videoObject.genre}`);
    container.classList.add('video-item');
    container.classList.add('active');

    container.append(videoContainer);

    if (videoObject.isComplete) {
        const actionDiv = document.createElement('div');
        actionDiv.classList.add('action');

        const undoButton = document.createElement('button');
        undoButton.classList.add('green');
        undoButton.innerHTML = undo;

        undoButton.addEventListener('click', function() {
            undoBooksFromCompleted(videoObject.id);
        })

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('red');
        deleteButton.innerHTML = deletes;

        deleteButton.addEventListener('click', function() {
            removeVideoFromCompleted(videoObject.id);
        })

        actionDiv.append(undoButton, deleteButton)
        videoContainer.append(actionDiv);
    } else {
        const actionDiv = document.createElement('div');
        actionDiv.classList.add('action');

        const alreadyButton = document.createElement('button');
        alreadyButton.classList.add('green');
        alreadyButton.innerHTML = alreadyWatched;

        alreadyButton.addEventListener('click', function () {
            addVideoToComplete(videoObject.id);
        })

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('red');
        deleteButton.innerHTML = deletes;

        deleteButton.addEventListener('click', function() {
            removeVideoFromCompleted(videoObject.id);
        })

        actionDiv.append(alreadyButton, deleteButton)
        videoContainer.append(actionDiv);
    }

    // document.dispatchEvent(new Event(RENDER_VIDEOS)) ;

    return container;
}


// event saat tombol submit di click
document.addEventListener('DOMContentLoaded', function () {
    let person = prompt("Please enter your name", "Your Name");
    const videoCont = document.getElementById('embedded-video');

    const nameElement = document.createElement('div');
    nameElement.classList.add('person');
    nameElement.innerHTML = `Hello, ${person}`
    videoCont.appendChild(nameElement);

    const uncompleteVideoList = document.getElementById('unwatchedList');
    const completeVideoList = document.getElementById('watchedList');
    const form = document.getElementById("inputFilm");

    uncompleteVideoList.innerHTML = '';
    completeVideoList.innerHTML = '';
    
    const searchButton = document.getElementById('searchSubmit');
    const genreValue = document.getElementsByName('genreInput');
    const humour = document.getElementById('humour-genre');
    const music = document.getElementById('music-genre');
    const drama = document.getElementById('drama-genre');
    const scifi = document.getElementById('scifi-genre');
    const japanese = document.getElementById('japanese-genre');
    const none = document.getElementById('none-genre')
    
    for (let i = 0; i < genreValue.length; i++) {
        // console.log(genreValue[i])
        document.querySelector('#searchVideoTitle').addEventListener('keyup', function(e) {
            e.preventDefault();
            if (e.keyCode === 13) {
                if (genreValue[i].checked) {
                    const genreIs = genreValue[i].value;
                    const searchValue = document.getElementById('searchVideoTitle').value;
                    let videoIs = [];
    
                    if (!searchValue) {
                        const isVideo = document.querySelectorAll(`.${genreIs}`);
                        const notVideo = document.querySelectorAll('article');
    
                        notVideo.forEach(article => {
                            article.classList.remove('active');
                            article.classList.add('inactive');
                        })
    
                        videoIs.push(isVideo);
                    } else if (searchValue) {
                        for (const index in videoList) {
                            if (!videoList[index].title.toLowerCase().match(searchValue.toLowerCase())) {
                                const notVideo = document.querySelectorAll('article');
    
                                notVideo.forEach(article => {
                                    article.classList.remove('active');
                                    article.classList.add('inactive');
                                })
                                      
                            } else if (videoList[index].title.toLowerCase().match(searchValue.toLowerCase())) {
                                const notVideo = document.querySelectorAll('article');
            
                                notVideo.forEach(article => {
                                    article.classList.remove('active');
                                    article.classList.add('inactive');
                                })
                                
            
                                const isVideo = document.querySelectorAll(`[id=video-${videoList[index].titleClass}]`);
                                
                                for (let j = 0; j < genreValue.length; j++) {
                                    for (let k = 0; k < isVideo.length; k++) {
                                        if (isVideo[k].classList[0] === genreIs) {
                                            videoIs.push(isVideo)
                                        }
                                    }
                                }
                            } else {
                                const notVideo = document.querySelectorAll('article');
                                notVideo.forEach(article => {
                                    article.classList.remove('active');
                                    article.classList.add('inactive');
                                })
                            }
                        } 
                    }
                    
                    console.log(videoIs)
                    if (videoIs.length !== 0) {
                        for (let i = 0; i < videoIs.length; i++) {
                            for (let j = 0; j < videoIs[i].length; j++) {
                                videoIs[i][j].classList.add('active');
                                videoIs[i][j].classList.remove('inactive');
                            }   
                        }
                    }
                    
                }
            }
        })
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            if (genreValue[i].checked) {
                const genreIs = genreValue[i].value;
                const searchValue = document.getElementById('searchVideoTitle').value;
                let videoIs = [];

                if (!searchValue) {
                    const isVideo = document.querySelectorAll(`.${genreIs}`);
                    const notVideo = document.querySelectorAll('article');

                    notVideo.forEach(article => {
                        article.classList.remove('active');
                        article.classList.add('inactive');
                    })

                    videoIs.push(isVideo);
                } else if (searchValue) {
                    for (const index in videoList) {
                        if (!videoList[index].title.toLowerCase().match(searchValue.toLowerCase())) {
                            const notVideo = document.querySelectorAll('article');

                            notVideo.forEach(article => {
                                article.classList.remove('active');
                                article.classList.add('inactive');
                            })
                                  
                        } else if (videoList[index].title.toLowerCase().match(searchValue.toLowerCase())) {
                            const notVideo = document.querySelectorAll('article');
        
                            notVideo.forEach(article => {
                                article.classList.remove('active');
                                article.classList.add('inactive');
                            })
                            
        
                            const isVideo = document.querySelectorAll(`[id=video-${videoList[index].titleClass}]`);
                            
                            for (let j = 0; j < genreValue.length; j++) {
                                for (let k = 0; k < isVideo.length; k++) {
                                    if (isVideo[k].classList[0] === genreIs) {
                                        videoIs.push(isVideo)
                                    }
                                }
                            }
                        } else {
                            const notVideo = document.querySelectorAll('article');
                            notVideo.forEach(article => {
                                article.classList.remove('active');
                                article.classList.add('inactive');
                            })
                        }
                    } 
                }
                
                console.log(videoIs)
                if (videoIs.length !== 0) {
                    for (let i = 0; i < videoIs.length; i++) {
                        for (let j = 0; j < videoIs[i].length; j++) {
                            videoIs[i][j].classList.add('active');
                            videoIs[i][j].classList.remove('inactive');
                        }   
                    }
                }
                
            }
        })
    }

    document.querySelector('#searchVideoTitle').addEventListener('keyup', function(e) {
        if (e.keyCode === 13) {
            if (!humour.checked && !music.checked && !drama.checked && !scifi.checked && !japanese.checked || none.checked) {
                // console.log(japanese.checked)
                e.preventDefault();
                const searchValue = document.getElementById('searchVideoTitle').value;
                let videoIs = [];

                if (!searchValue) {
                    const notVideo = document.querySelectorAll('article');
                    notVideo.forEach(article => {
                        article.classList.remove('inactive');
                        article.classList.add('active');
                    })
                } else if (searchValue) {
                    for (const index in videoList) {
                        if (!videoList[index].title.toLowerCase().match(searchValue.toLowerCase())) {
                            const notVideo = document.querySelectorAll('article');
                            notVideo.forEach(article => {
                                article.classList.remove('active');
                                article.classList.add('inactive');
                            })

                        } else if (videoList[index].title.toLowerCase().match(searchValue.toLowerCase())) {
                            const notVideo = document.querySelectorAll('article');

                            notVideo.forEach(article => {
                                article.classList.remove('active');
                                article.classList.add('inactive');
                            })
                            

                            const isVideo = document.querySelectorAll(`[id=video-${videoList[index].titleClass}]`);

                            videoIs.push(isVideo)
                            
                        } else {
                            const notVideo = document.querySelectorAll('article');
                            notVideo.forEach(article => {
                                article.classList.remove('active');
                                article.classList.add('inactive');
                            })
                        }
                    } 
                }

                for (let i = 0; i < videoIs.length; i++) {
                    for (let j = 0; j < videoIs[i].length; j++) {
                        videoIs[i][j].classList.add('active');
                        videoIs[i][j].classList.remove('inactive');
                    }   
                }
            }
        }
    })

    searchButton.addEventListener('click', function(e) {
        if (!humour.checked && !music.checked && !drama.checked && !scifi.checked && !japanese.checked || none.checked) {
            // console.log(japanese.checked)
            e.preventDefault();
            const searchValue = document.getElementById('searchVideoTitle').value;
            let videoIs = [];

            if (!searchValue) {
                const notVideo = document.querySelectorAll('article');
                notVideo.forEach(article => {
                    article.classList.remove('inactive');
                    article.classList.add('active');
                })
            } else if (searchValue) {
                for (const index in videoList) {
                    if (!videoList[index].title.toLowerCase().match(searchValue.toLowerCase())) {
                        const notVideo = document.querySelectorAll('article');
                        notVideo.forEach(article => {
                            article.classList.remove('active');
                            article.classList.add('inactive');
                        })

                    } else if (videoList[index].title.toLowerCase().match(searchValue.toLowerCase())) {
                        const notVideo = document.querySelectorAll('article');

                        notVideo.forEach(article => {
                            article.classList.remove('active');
                            article.classList.add('inactive');
                        })
                        

                        const isVideo = document.querySelectorAll(`[id=video-${videoList[index].titleClass}]`);

                        videoIs.push(isVideo)
                        
                    } else {
                        const notVideo = document.querySelectorAll('article');
                        notVideo.forEach(article => {
                            article.classList.remove('active');
                            article.classList.add('inactive');
                        })
                    }
                } 
            }

            for (let i = 0; i < videoIs.length; i++) {
                for (let j = 0; j < videoIs[i].length; j++) {
                    videoIs[i][j].classList.add('active');
                    videoIs[i][j].classList.remove('inactive');
                }   
            }
        }
    })
    

    for (const videoItem of videoList) {
        const videoElement = makeVideo(videoItem);
        // console.log(videoItem)
        if(!videoItem.isComplete) {
            uncompleteVideoList.append(videoElement)
        } else {
            completeVideoList.append(videoElement)
        }
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // mencegah autosubmit
        takeInputVideo();
    });
})


document.addEventListener(RENDER_VIDEOS, function () {

    const uncompleteVideoList = document.getElementById('unwatchedList');
    const completeVideoList = document.getElementById('watchedList');

    uncompleteVideoList.innerHTML = '';
    completeVideoList.innerHTML = '';

    for (const videoItem of videoList) {
        const videoElement = makeVideo(videoItem);
        // console.log(videoItem)
        if(!videoItem.isComplete) {
            uncompleteVideoList.append(videoElement)
        } else {
            completeVideoList.append(videoElement)
        }
    }
})