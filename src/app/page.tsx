import Image from 'next/image'

export default function Home() {
  return (
    <div className="bg-background h-screen flex flex-col items-center justify-center text-center">
      <main>
        <p className="mt-4 text-lg">Coming Soon: The Unofficial Home for</p>
        <h1 className="text-4xl font-bold">Project K</h1>
        <Image
          src="/sippy.png"
          width={508}
          height={506}
          alt="Sippy sip"    
        />
      </main>
      <footer className="mt-8">
        <a className="link" href="https://discord.com/invite/n7hgcgbvpG">Join us on Discord</a>
      </footer>
    </div>
  );
}
