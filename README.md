# 에제르코치 이재열 프로필 웹앱

> 2026-11 업데이트: 문구를 1인칭으로 다듬고, 실제 경력·자격 타임라인과 가독성(Pretendard 글꼴, 줄간격, 글자 크기)을 개선했습니다. 명함 디자인도 같은 네이비·골드 톤으로 맞췄습니다.

## 파일 실행
1. `index.html`을 더블 클릭하면 기본 화면을 확인할 수 있습니다.
2. PWA 설치 기능과 서비스워커를 확인하려면 로컬 서버 또는 웹 호스팅에 업로드하세요.

## 무료 배포 방법
### GitHub Pages
- 새 저장소 생성
- 이 폴더 안의 파일 전체 업로드
- Settings → Pages → Deploy from a branch → main / root 선택

### Netlify
- Netlify의 Deploy manually 화면에 이 폴더를 드래그해서 업로드

## 내용 수정
- 이름·소개·경력·프로젝트: `index.html`
- 색상·글꼴·화면 구성: `style.css`
- 공유·문의·테마 기능: `script.js`

## 프로필 사진 넣기
1. 사진을 `profile.jpg` 이름으로 폴더에 넣습니다.
2. `index.html`의 `<div class="avatar">...</div>` 부분을 다음으로 교체합니다.

```html
<div class="avatar photo-avatar">
  <img src="profile.jpg" alt="Ezer Coach 프로필 사진" />
</div>
```
3. `style.css`에 다음을 추가합니다.

```css
.photo-avatar { overflow: hidden; }
.photo-avatar img { width: 100%; height: 100%; object-fit: cover; }
```
