const SocialKakao = () => {
  const Rest_api_key = process.env.REACT_APP_KAKAO_KEY;
  const redirect_uri = "http://localhost:3000/auth"; //Redirect URI에 토큰 같이 담겨서 넘어옴.

  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = kakaoURL;
  };
  return (
    <>
      <button onClick={handleLogin}>카카오 로그인</button>
    </>
  );
};
export default SocialKakao;
