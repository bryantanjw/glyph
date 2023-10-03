import Image from "next/image";

export function Testimonials() {
  return (
    <div className="max-w-6xl py-12 mx-auto sm:py-24 px-10 lg:px-20">
      <div className="py-24 mx-auto max-w-7xl">
        <h2 className="text-center text-xl font-semibold leading-8 text-black">
          Trusted by the world’s most innovative brands
        </h2>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <Image
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 grayscale hover:grayscale-0 transition-all duration-300"
            src="/aws-logo.png"
            alt="AWS"
            width={158}
            height={48}
          />
          <Image
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 grayscale hover:grayscale-0 transition-all duration-300"
            src="/google-dev-logo.png"
            alt="Google Developers"
            width={158}
            height={48}
          />
          <Image
            className="col-span-2 max-h-12 w-full object-contain lg:col-span-1 grayscale hover:grayscale-0 transition-all duration-300"
            src="/hugging-face-logo.png"
            alt="Hugging Face"
            width={158}
            height={48}
          />
        </div>
      </div>

      {/* <div className="pt-8 transition duration-500 ease-in-out transform scale-100 translate-x-0 translate-y-0 opacity-100">
        <div className="mb-12 space-y-5 md:mb-16 md:text-center">
          <div className="inline-block px-3 py-1 text-sm font-semibold text-indigo-100 rounded-lg md:text-center text-cn bg-[#202c47] bg-opacity-60 hover:cursor-pointer hover:bg-opacity-40">
            Words from Others
          </div>
          <h1 className="mb-5 text-3xl font-semibold md:text-center md:text-5xl">
            It&apos;s not just us.
          </h1>
          <p className="text-xl md:text-center md:text-2xl">
            Here&apos;s what others have to say about us.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ul className="space-y-4">
          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-100 to-pink-100 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
              <a
                href="https://twitter.com/kanyewest"
                className="cursor-pointer"
              >
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-white ring-1 ring-gray-900/5 hover:border-gray-600 transition duration-400">
                  <div className="flex items-center space-x-4">
                    <Image
                      src="https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg"
                      className="bg-center bg-cover border rounded-full"
                      alt="Kanye West"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h3 className="text-lg font-semibold">Kanye West</h3>
                      <p className="text-md">Rapper &amp; Entrepreneur</p>
                    </div>
                  </div>
                  <p className="leading-normal text-md">Find God.</p>
                </div>
              </a>
            </div>
          </li>
          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-100 to-pink-100 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
              <a href="https://twitter.com/tim_cook" className="cursor-pointer">
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-white ring-1 ring-gray-900/5 hover:border-gray-600 transition duration-400">
                  <div className="flex items-center space-x-4">
                    <Image
                      src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                      className="bg-center bg-cover border rounded-full"
                      alt="Cook Pu"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h3 className="text-lg font-semibold">Cook Pu</h3>
                      <p className="text-md">CEO of Apple</p>
                    </div>
                  </div>
                  <p className="leading-normal text-md">
                    Diam quis enim lobortis scelerisque fermentum dui faucibus
                    in ornare. Donec pretium vulputate sapien nec sagittis
                    aliquam malesuada bibendum.
                  </p>
                </div>
              </a>
            </div>
          </li>
          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-100 to-pink-100 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
              <a
                href="https://twitter.com/kanyewest"
                className="cursor-pointer"
              >
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-white ring-1 ring-gray-900/5 hover:border-gray-600 transition duration-400">
                  <div className="flex items-center space-x-4">
                    <Image
                      src="https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg"
                      className="bg-center bg-cover border rounded-full"
                      alt="Kanye West"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h3 className="text-lg font-semibold">Kanye West</h3>
                      <p className="text-md">Rapper &amp; Entrepreneur</p>
                    </div>
                  </div>
                  <p className="leading-normal text-md">Find God.</p>
                </div>
              </a>
            </div>
          </li>
          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-100 to-pink-100 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
              <a href="https://twitter.com/tim_cook" className="cursor-pointer">
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-white ring-1 ring-gray-900/5 hover:border-gray-600 transition duration-400">
                  <div className="flex items-center space-x-4">
                    <Image
                      src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                      className="bg-center bg-cover border rounded-full"
                      alt="Cook Pu"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h3 className="text-lg font-semibold">Cook Pu</h3>
                      <p className="text-md">CEO of Apple</p>
                    </div>
                  </div>
                  <p className="leading-normal text-md">
                    Diam quis enim lobortis scelerisque fermentum dui faucibus
                    in ornare. Donec pretium vulputate sapien nec sagittis
                    aliquam malesuada bibendum.
                  </p>
                </div>
              </a>
            </div>
          </li>
        </ul>

        <ul className="hidden space-y-4 sm:block">
          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-100 to-pink-100 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
              <a href="https://twitter.com/paraga" className="cursor-pointer">
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-white ring-1 ring-gray-900/5 hover:border-gray-600 transition duration-400">
                  <div className="flex items-center space-x-4">
                    <Image
                      src="https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg"
                      className="bg-center bg-cover border rounded-full"
                      alt="Parag Agrawal"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h3 className="text-lg font-semibold">Parag Agrawal</h3>
                      <p className="text-md">CEO of Twitter</p>
                    </div>
                  </div>
                  <p className="leading-normal text-md">
                    Enim neque volutpat ac tincidunt vitae semper. Mattis
                    aliquam faucibus purus in massa tempor. Neque vitae tempus
                    quam pellentesque nec. Turpis cursus in hac habitasse platea
                    dictumst.
                  </p>
                </div>
              </a>
            </div>
          </li>
          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-100 to-pink-100 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
              <a href="https://twitter.com/tim_cook" className="cursor-pointer">
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-white ring-1 ring-gray-900/5 hover:border-gray-600 transition duration-400">
                  <div className="flex items-center space-x-4">
                    <Image
                      src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                      className="bg-center bg-cover border rounded-full"
                      alt="Cook Pu"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h3 className="text-lg font-semibold">Cook Pu</h3>
                      <p className="text-md">CEO of Apple</p>
                    </div>
                  </div>
                  <p className="leading-normal text-md">
                    Diam quis enim lobortis scelerisque fermentum dui faucibus
                    in ornare. Donec pretium vulputate sapien nec sagittis
                    aliquam malesuada bibendum.
                  </p>
                </div>
              </a>
            </div>
          </li>
          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-100 to-pink-100 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
              <a href="https://twitter.com/paraga" className="cursor-pointer">
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-white ring-1 ring-gray-900/5 hover:border-gray-600 transition duration-400">
                  <div className="flex items-center space-x-4">
                    <Image
                      src="https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg"
                      className="bg-center bg-cover border rounded-full"
                      alt="Parag Agrawal"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h3 className="text-lg font-semibold">Parag Agrawal</h3>
                      <p className="text-md">CEO of Twitter</p>
                    </div>
                  </div>
                  <p className="leading-normal text-md">
                    Enim neque volutpat ac tincidunt vitae semper. Mattis
                    aliquam faucibus purus in massa tempor. Neque vitae tempus
                    quam pellentesque nec. Turpis cursus in hac habitasse platea
                    dictumst.
                  </p>
                </div>
              </a>
            </div>
          </li>
          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-100 to-pink-100 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
              <a href="https://twitter.com/tim_cook" className="cursor-pointer">
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-white ring-1 ring-gray-900/5 hover:border-gray-600 transition duration-400">
                  <div className="flex items-center space-x-4">
                    <Image
                      src="https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg"
                      className="bg-center bg-cover border rounded-full"
                      alt="Cook Pu"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h3 className="text-lg font-semibold">Cook Pu</h3>
                      <p className="text-md">CEO of Apple</p>
                    </div>
                  </div>
                  <p className="leading-normal text-md">
                    Diam quis enim lobortis scelerisque fermentum dui faucibus
                    in ornare. Donec pretium vulputate sapien nec sagittis
                    aliquam malesuada bibendum.
                  </p>
                </div>
              </a>
            </div>
          </li>
        </ul>

        <ul className="hidden space-y-4 lg:block">
          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-100 to-pink-100 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
              <a
                href="https://twitter.com/satyanadella"
                className="cursor-pointer"
              >
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-white ring-1 ring-gray-900/5 hover:border-gray-600 transition duration-400">
                  <div className="flex items-center space-x-4">
                    <Image
                      src="https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg"
                      className="bg-center bg-cover border rounded-full"
                      alt="Satya Nadella"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h3 className="text-lg font-semibold">Satya Nadella</h3>
                      <p className="text-md">CEO of Microsoft</p>
                    </div>
                  </div>
                  <p className="leading-normal text-md">
                    Tortor dignissim convallis aenean et tortor at. At ultrices
                    mi tempus imperdiet nulla malesuada. Id cursus metus aliquam
                    eleifend mi. Quis ipsum suspendisse ultrices gravida dictum
                    fusce ut.
                  </p>
                </div>
              </a>
            </div>
          </li>
          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-100 to-pink-100 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
              <a
                href="https://twitter.com/dan_schulman"
                className="cursor-pointer"
              >
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-white ring-1 ring-gray-900/5 hover:border-gray-600 transition duration-400">
                  <div className="flex items-center space-x-4">
                    <Image
                      src="https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg"
                      className="bg-center bg-cover border rounded-full"
                      alt="Dan Schulman"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h3 className="text-lg font-semibold">Dan Schulman</h3>
                      <p className="text-md">CEO of PayPal</p>
                    </div>
                  </div>
                  <p className="leading-normal text-md">
                    Quam pellentesque nec nam aliquam sem et tortor consequat
                    id. Enim sit amet venenatis urna cursus.
                  </p>
                </div>
              </a>
            </div>
          </li>
          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-100 to-pink-100 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
              <a
                href="https://twitter.com/satyanadella"
                className="cursor-pointer"
              >
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-white ring-1 ring-gray-900/5 hover:border-gray-600 transition duration-400">
                  <div className="flex items-center space-x-4">
                    <Image
                      src="https://pbs.twimg.com/profile_images/1221837516816306177/_Ld4un5A_400x400.jpg"
                      className="bg-center bg-cover border rounded-full"
                      alt="Satya Nadella"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h3 className="text-lg font-semibold">Satya Nadella</h3>
                      <p className="text-md">CEO of Microsoft</p>
                    </div>
                  </div>
                  <p className="leading-normal text-md">
                    Tortor dignissim convallis aenean et tortor at. At ultrices
                    mi tempus imperdiet nulla malesuada. Id cursus metus aliquam
                    eleifend mi. Quis ipsum suspendisse ultrices gravida dictum
                    fusce ut.
                  </p>
                </div>
              </a>
            </div>
          </li>
          <li className="text-sm leading-6">
            <div className="relative group">
              <div className="absolute transition rounded-lg opacity-25 -inset-1 bg-gradient-to-r from-purple-100 to-pink-100 blur duration-400 group-hover:opacity-100 group-hover:duration-200"></div>
              <a
                href="https://twitter.com/dan_schulman"
                className="cursor-pointer"
              >
                <div className="relative p-6 space-y-6 leading-none rounded-lg bg-white ring-1 ring-gray-900/5 hover:border-gray-600 transition duration-400">
                  <div className="flex items-center space-x-4">
                    <Image
                      src="https://pbs.twimg.com/profile_images/516916920482672641/3jCeLgFb_400x400.jpeg"
                      className="bg-center bg-cover border rounded-full"
                      alt="Dan Schulman"
                      width={40}
                      height={40}
                    />
                    <div>
                      <h3 className="text-lg font-semibold">Dan Schulman</h3>
                      <p className="text-md">CEO of PayPal</p>
                    </div>
                  </div>
                  <p className="leading-normal text-md">
                    Quam pellentesque nec nam aliquam sem et tortor consequat
                    id. Enim sit amet venenatis urna cursus.
                  </p>
                </div>
              </a>
            </div>
          </li>
        </ul>
      </div> */}
    </div>
  );
}
