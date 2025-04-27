import Link from "next/link";

export default function Page() {
  return (
    <div
      className="w-screen h-screen text-xl flex flex-col items-center justify-center gap-4 text-black bg-white"
      style={{
        backgroundImage: `url('/background/3.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-5xl">🎓 أهلاً بكم في محفوظاتي</h1>
      <h2 className="my-4 text-3xl">
        ! رفيق الطفل لحفظ وتعلّم المحفوظات بطريقة ممتعة
      </h2>
      <p className="text-center text-2xl my-8">
        في محفوظاتي نؤمن بأن التعلم يبدأ من الحب والمرح
        <br />
        صمّمنا هذا التطبيق ليكون وسيلة تعليمية مبسّطة وآمنة للأطفال، تساعدهم على
        حفظ المحفوظات
      </p>
      <p className="text-2xl">إختر مستواك لتبدأ التعلم</p>
      <div className="flex flex-row-reverse text-xl gap-8">
        <Link
          href="/games?level=1"
          className="bg-blue-400 border border-transparent rounded-xl text-white px-4 py-2"
        >
          السنة الأولى
        </Link>
        <Link
          href="/games?level=2"
          className="border-blue-400 border rounded-xl text-blue-400 px-4 py-2"
        >
          السنة الثانية
        </Link>
      </div>
    </div>
  );
}
