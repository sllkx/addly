function loadBanner(divId = '1', userId = 'admin', width = 300, height = 250, country = 'ko') {
  const div = document.getElementById(divId);
  if (!div) {
    console.error(`Element with id="${divId}" not found.`);
    return;
  }
  div.innerHTML = '';

	fetch(`https://addly.isai.kr/banner_api.php?user=${encodeURIComponent(userId)}&country=${encodeURIComponent(country)}`)
    .then(res => res.json())
    .then(data => {
      const hasImage = data.image && data.image.trim() !== '';

      const banner = document.createElement('div');
      banner.className = 'snapp-banner-container';
      banner.id = `banner-${divId}`;
      
      banner.style.width = (typeof width === 'number' ? width + 'px' : width);
      banner.style.height = (typeof height === 'number' ? height + 'px' : height);

      if (width.toString() === '100%') {
        banner.classList.add('layout-full-width');
      }

      const targetUrl = `https://addly.isai.kr/banner2.php?link=${encodeURIComponent(data.link)}&user=${encodeURIComponent(userId)}&country=${encodeURIComponent(country)}`;
      banner.addEventListener('click', (e) => {
        if (e.target.closest('.fixed-icon')) return;
        window.open(targetUrl, '_blank');
      });

      const imageDiv = document.createElement('div');
      imageDiv.className = 'image-div';
      if (hasImage) {
        imageDiv.style.backgroundImage = `url('${data.image}')`;
      }

      const textDiv = document.createElement('div');
      textDiv.className = 'text-div';
      const title = document.createElement('h3');
      title.className = 'banner-title';
      title.textContent = data.title;
      const desc = document.createElement('p');
      desc.className = 'banner-desc';
      desc.textContent = data.desc;

      const fixedIcon = document.createElement('a');
      fixedIcon.className = 'fixed-icon';
      fixedIcon.href = 'https://addly.isai.kr/';
      fixedIcon.target = '_blank';
      const fixedImg = document.createElement('img');
      fixedImg.src = 'https://cdn.jsdelivr.net/npm/cdnhost@latest/addlybear.png';
      fixedImg.alt = 'a';
      fixedImg.style.width = '100%';

      textDiv.appendChild(title);
      textDiv.appendChild(desc);
      fixedIcon.appendChild(fixedImg);
      banner.appendChild(imageDiv);
      banner.appendChild(textDiv);
      banner.appendChild(fixedIcon);
      div.appendChild(banner);

      const style = document.createElement('style');
      style.textContent = `
        .snapp-banner-container {
            position: relative;
            overflow: hidden;
            border-radius: 1rem;
            border: 3px solid #fff;
            box-sizing: border-box;
            background: #f0f0f0;
            cursor: pointer;
        }
        .fixed-icon {
            position: absolute; top: 10px; right: 10px;
            width: 30px; height: 30px; z-index: 3;
        }
        .fixed-icon img { width: 100% }

        @media (min-width: 600px) {
            .snapp-banner-container.layout-full-width {
                display: flex; flex-direction: row;
            }
            .snapp-banner-container.layout-full-width .image-div {
                width: ${height * 1.2}px; height: 100%; flex-shrink: 0;
                background-size: cover; background-position: center;
            }
            .snapp-banner-container.layout-full-width .text-div {
                flex-grow: 1; padding: 20px;
                display: flex; flex-direction: column; justify-content: center;
                background: #fff;
            }
            .snapp-banner-container.layout-full-width .banner-title {
                color: #111; font-size: 1.2em; font-weight: bold; margin: 0;
            }
            .snapp-banner-container.layout-full-width .banner-desc {
                color: #555; font-size: 1em; margin: 0;
            }
            .snapp-banner-container:not(.layout-full-width) {
                 display: flex; align-items: flex-end;
            }
            .snapp-banner-container:not(.layout-full-width) .image-div {
                position: absolute; top:0; left:0; width:100%; height:100%;
                background-size: cover; background-position: center; z-index:1;
            }
            .snapp-banner-container:not(.layout-full-width) .text-div {
                width: 100%; position: relative; z-index: 2; padding: 40px 20px 20px 20px;
                box-sizing: border-box; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);
            }
            .snapp-banner-container:not(.layout-full-width) .banner-title,
            .snapp-banner-container:not(.layout-full-width) .banner-desc {
                color: #fff; text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
                overflow: hidden; text-overflow: ellipsis; display: -webkit-box;
                -webkit-box-orient: vertical; -webkit-line-clamp: 2;
				margin:0;
            }
        }
        
        @media (max-width: 768px) {
            .snapp-banner-container {
                display: flex; align-items: flex-end;
            }
            .snapp-banner-container .image-div {
                position: absolute; top: 0; left: 0; width: 100%; height: 100%;
                background-size: cover; background-position: center; z-index: 1;
            }
            .snapp-banner-container .text-div {
                width: 100%; position: relative; z-index: 2;
                padding: 40px 20px 20px 20px; box-sizing: border-box;
                background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 40%, transparent 100%);
            }
            .snapp-banner-container .banner-title,
            .snapp-banner-container .banner-desc {
                color: #fff !important; text-shadow: 1px 1px 3px rgba(0,0,0,0.7);
                margin: 0; overflow: hidden; text-overflow: ellipsis;
                display: -webkit-box; -webkit-box-orient: vertical;
				margin:0;
            }
            .snapp-banner-container .banner-title {
                font-weight: bold; -webkit-line-clamp: 2;
            }
            .snapp-banner-container .banner-desc {
                font-size: 0.9em; -webkit-line-clamp: 2;
            }
        }
      `;
      document.head.appendChild(style);
    })
    .catch(err => {
      console.error('배너 로드 실패:', err);
    });
}