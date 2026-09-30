import { ArrowUpRight, BriefcaseBusiness } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OurFreelancers() {
	return (
		<section id="freelancers" className="relative overflow-hidden bg-[#F8F7FC] py-20">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-12">
					<div className="mb-4 flex items-center gap-3">
						<div className="h-px w-8 bg-purple-600" />
						<span className="text-xs font-semibold uppercase tracking-[0.2em] text-purple-600">
							The people behind the work
						</span>
					</div>
					<h2 className="font-playfair text-4xl sm:text-5xl">
						<span className="text-gray-900">Meet our</span>{' '}
						<span className="italic text-purple-600">Freelancers</span>
					</h2>
				</div>

				<article className="grid overflow-hidden rounded-2xl bg-white shadow-sm md:grid-cols-[minmax(280px,0.8fr)_1.2fr]">
					<div className="relative min-h-[360px] bg-gray-100 md:min-h-[520px]">
						<img
							src="/assets/akash.jpeg"
							alt="Nallamalupu Akash Reddy"
							className="absolute inset-0 h-full w-full object-cover object-center"
						/>
						<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent px-6 pb-6 pt-20 text-white">
							<p className="text-xl font-semibold">Nallamalupu Akash Reddy</p>
							<p className="mt-1 text-sm text-purple-200">Co-Founder, B To P Nexus</p>
						</div>
					</div>

					<div className="flex flex-col justify-center p-6 sm:p-10 lg:p-14">
						<div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700">
							<BriefcaseBusiness aria-hidden="true" className="h-4 w-4" />
							<span>Co-Founder</span>
						</div>

						<div className="space-y-4 leading-relaxed text-gray-600">
							<p>
								B To P Nexus was founded by{' '}
								<span className="font-semibold text-gray-900">Bala Prasan Patakamuri</span>{' '}
								with a simple yet powerful vision: to bridge the gap between ideas and digital
								products. As co-founder, <span className="font-semibold text-gray-900">Nallamalupu Akash Reddy</span>{' '}
								helps bring that vision to life through thoughtful collaboration and a commitment
								to quality.
							</p>
							<p>
								<span className="font-playfair italic text-purple-600">Born To Publish</span>{' '}
								is our belief that every great idea deserves to see the light of day. From websites
								and mobile apps to games, we turn concepts into polished digital experiences with
								creative design and modern technology.
							</p>
							<p>
								Our team delivers web and app development, UI/UX design, and digital marketing
								services that help businesses grow in the digital world.
							</p>
						</div>

						<Link
							to="/contact"
							className="mt-8 inline-flex w-fit items-center gap-2 font-semibold text-purple-700 transition-colors hover:text-purple-900"
						>
							Work with our team
							<ArrowUpRight aria-hidden="true" className="h-4 w-4" />
						</Link>
					</div>
				</article>
			</div>
		</section>
	);
}
