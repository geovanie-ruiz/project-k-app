import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-neutral-200 dark:bg-gray-800">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo-outline.png"
                alt="Temporary logo"
                className="h-8 me-3"
                width={48}
                height={40}
              />
              <span className="sr-only">Two Runes</span>
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                2Runes.gg
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Resources
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="#" className="hover:underline ">
                    API
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="#" className="hover:underline ">
                    Minion
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link
                    href="https://discord.com/invite/n7hgcgbvpG"
                    className="hover:underline "
                  >
                    Discord
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    href="https://www.reddit.com/r/RiotProjectK/"
                    className="hover:underline "
                  >
                    Reddit
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link href="/policies/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/policies/terms" className="hover:underline">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li>
                  <Link href="/policies/cookies" className="hover:underline">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 max-w-md max-sm:text-center dark:text-gray-400">
            2Runes.gg was created under Riot Games&apos; &quot;Legal Jibber
            Jabber&quot; policy using assets owned by Riot Games. Riot Games
            does not endorse or sponsor this project.
            <br />
            All original content is © 2024 2Runes.gg and may not be used or
            reproduced without consent.
          </span>
        </div>
      </div>
    </footer>
  );
}
