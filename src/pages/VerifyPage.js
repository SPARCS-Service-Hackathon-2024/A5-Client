import Footer from "../components/common/Footer";

export default function VerifyPage() {
  const takePhoto = () => {
    console.log("photo");
  };
  return (
    <>
      <div>Verify</div>
      <Footer second="촬영하기" funct={takePhoto} />
    </>
  );
}
