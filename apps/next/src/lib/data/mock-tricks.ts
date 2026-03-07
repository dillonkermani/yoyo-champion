import type { Trick } from './types';

export const mockTricks: Trick[] = [
  // BEGINNER TRICKS (Difficulty 1)
  {
    id: 'trick-001',
    slug: 'sleeper',
    name: 'Sleeper',
    description: 'The foundation of all yo-yo tricks. Learn to throw a strong, straight sleeper that spins at the end of the string.',
    difficulty: 1,
    style: '1A',
    genre: 'basics',
    xpReward: 50,
    thumbnailUrl: 'https://example.com/thumbnails/sleeper.jpg',
    previewGif: 'https://example.com/gifs/sleeper.gif',
    videos: [
      { id: 'v-001-1', angle: 'front', url: 'https://example.com/videos/sleeper-front.mp4', duration: 45, thumbnailUrl: 'https://example.com/thumbnails/sleeper-front.jpg' },
      { id: 'v-001-2', angle: 'side', url: 'https://example.com/videos/sleeper-side.mp4', duration: 45, thumbnailUrl: 'https://example.com/thumbnails/sleeper-side.jpg' },
    ],
    steps: [
      { id: 's-001-1', order: 1, title: 'Grip the yo-yo', description: 'Hold the yo-yo in your palm with the string wound around the axle. The string should come over the top.', timestamp: 0, duration: 10, tipText: 'Keep your palm facing up' },
      { id: 's-001-2', order: 2, title: 'Wind up', description: 'Bend your arm at the elbow, bringing the yo-yo up near your ear.', timestamp: 10, duration: 8 },
      { id: 's-001-3', order: 3, title: 'Throw down', description: 'Extend your arm downward with a smooth, quick motion. Release the yo-yo as your arm straightens.', timestamp: 18, duration: 12, tipText: 'Keep your throw straight - no angle!' },
      { id: 's-001-4', order: 4, title: 'Let it sleep', description: 'The yo-yo should spin at the bottom of the string. A good sleeper lasts 30+ seconds.', timestamp: 30, duration: 15 },
    ],
    prerequisites: [],
    commonMistakes: [
      'Throwing at an angle causes the yo-yo to tilt and die quickly',
      'Releasing too early or late affects spin time',
      'Gripping too tight restricts the throw',
    ],
    tips: [
      'Practice your throw motion without the yo-yo first',
      'A straighter throw means longer sleep time',
      'Keep your shoulder relaxed',
    ],
    estimatedMinutes: 15,
  },
  {
    id: 'trick-002',
    slug: 'gravity-pull',
    name: 'Gravity Pull',
    description: 'The most basic yo-yo return. Simply throw down and let the yo-yo return to your hand automatically.',
    difficulty: 1,
    style: '1A',
    genre: 'basics',
    xpReward: 50,
    thumbnailUrl: 'https://example.com/thumbnails/gravity-pull.jpg',
    previewGif: 'https://example.com/gifs/gravity-pull.gif',
    videos: [
      { id: 'v-002-1', angle: 'front', url: 'https://example.com/videos/gravity-pull-front.mp4', duration: 30, thumbnailUrl: 'https://example.com/thumbnails/gravity-pull-front.jpg' },
    ],
    steps: [
      { id: 's-002-1', order: 1, title: 'Throw the sleeper', description: 'Perform a basic sleeper throw.', timestamp: 0, duration: 8 },
      { id: 's-002-2', order: 2, title: 'Tug to return', description: 'Give a small tug on the string to signal the yo-yo to return.', timestamp: 8, duration: 10, tipText: 'Timing is key - tug when the yo-yo still has spin' },
      { id: 's-002-3', order: 3, title: 'Catch', description: 'Let the yo-yo return to your palm and close your hand around it.', timestamp: 18, duration: 12 },
    ],
    prerequisites: ['trick-001'],
    commonMistakes: [
      'Tugging too hard causes tangled string',
      'Waiting too long - the yo-yo loses spin',
    ],
    tips: [
      'A responsive yo-yo makes this easier',
      'Turn your palm up to catch smoothly',
    ],
    estimatedMinutes: 10,
  },
  {
    id: 'trick-003',
    slug: 'forward-pass',
    name: 'Forward Pass',
    description: 'Throw the yo-yo forward like a punch, then catch it as it returns. Essential for looping tricks.',
    difficulty: 1,
    style: '1A',
    genre: 'basics',
    xpReward: 75,
    thumbnailUrl: 'https://example.com/thumbnails/forward-pass.jpg',
    previewGif: 'https://example.com/gifs/forward-pass.gif',
    videos: [
      { id: 'v-003-1', angle: 'side', url: 'https://example.com/videos/forward-pass-side.mp4', duration: 40, thumbnailUrl: 'https://example.com/thumbnails/forward-pass-side.jpg' },
    ],
    steps: [
      { id: 's-003-1', order: 1, title: 'Starting position', description: 'Hold the yo-yo at your hip with your palm facing backward.', timestamp: 0, duration: 8 },
      { id: 's-003-2', order: 2, title: 'Throw forward', description: 'Swing your arm forward and release the yo-yo, like throwing a punch.', timestamp: 8, duration: 12 },
      { id: 's-003-3', order: 3, title: 'Let it return', description: 'The yo-yo will arc forward and return to you automatically.', timestamp: 20, duration: 10 },
      { id: 's-003-4', order: 4, title: 'Catch with palm down', description: 'Catch the yo-yo with your palm facing down.', timestamp: 30, duration: 10 },
    ],
    prerequisites: ['trick-002'],
    commonMistakes: [
      'Throwing upward instead of straight forward',
      'Palm facing wrong direction on catch',
    ],
    tips: [
      'Keep your elbow close to your body',
      'Practice the motion slowly first',
    ],
    estimatedMinutes: 20,
  },
  {
    id: 'trick-004',
    slug: 'breakaway',
    name: 'Breakaway',
    description: 'A sideways throw that is the foundation for side-style string tricks. Essential for 1A play.',
    difficulty: 1,
    style: '1A',
    genre: 'basics',
    xpReward: 100,
    thumbnailUrl: 'https://example.com/thumbnails/breakaway.jpg',
    previewGif: 'https://example.com/gifs/breakaway.gif',
    videos: [
      { id: 'v-004-1', angle: 'front', url: 'https://example.com/videos/breakaway-front.mp4', duration: 50, thumbnailUrl: 'https://example.com/thumbnails/breakaway-front.jpg' },
      { id: 'v-004-2', angle: 'overhead', url: 'https://example.com/videos/breakaway-overhead.mp4', duration: 50, thumbnailUrl: 'https://example.com/thumbnails/breakaway-overhead.jpg' },
    ],
    steps: [
      { id: 's-004-1', order: 1, title: 'Position', description: 'Hold yo-yo at shoulder height, arm across your body.', timestamp: 0, duration: 10 },
      { id: 's-004-2', order: 2, title: 'Swing out', description: 'Swing your arm outward in an arc, releasing the yo-yo.', timestamp: 10, duration: 15 },
      { id: 's-004-3', order: 3, title: 'Arc across', description: 'The yo-yo swings in a large arc in front of you.', timestamp: 25, duration: 15 },
      { id: 's-004-4', order: 4, title: 'Catch or mount', description: 'Catch the yo-yo or use the swing to land a mount.', timestamp: 40, duration: 10 },
    ],
    prerequisites: ['trick-001'],
    commonMistakes: [
      'Throwing too hard - control is more important than speed',
      'Not keeping the plane straight',
    ],
    tips: [
      'Imagine swinging the yo-yo along an invisible wall',
      'This throw opens up most 1A tricks',
    ],
    estimatedMinutes: 25,
  },
  {
    id: 'trick-005',
    slug: 'bind',
    name: 'Bind Return',
    description: 'The essential technique for returning unresponsive yo-yos. A must-learn for modern yo-yoing.',
    difficulty: 1,
    style: '1A',
    genre: 'basics',
    xpReward: 150,
    thumbnailUrl: 'https://example.com/thumbnails/bind.jpg',
    previewGif: 'https://example.com/gifs/bind.gif',
    videos: [
      { id: 'v-005-1', angle: 'front', url: 'https://example.com/videos/bind-front.mp4', duration: 60, thumbnailUrl: 'https://example.com/thumbnails/bind-front.jpg' },
      { id: 'v-005-2', angle: 'side', url: 'https://example.com/videos/bind-side.mp4', duration: 60, thumbnailUrl: 'https://example.com/thumbnails/bind-side.jpg' },
      { id: 'v-005-3', angle: 'pov', url: 'https://example.com/videos/bind-pov.mp4', duration: 60, thumbnailUrl: 'https://example.com/thumbnails/bind-pov.jpg' },
    ],
    steps: [
      { id: 's-005-1', order: 1, title: 'Trapeze mount', description: 'Land in a basic trapeze position.', timestamp: 0, duration: 15 },
      { id: 's-005-2', order: 2, title: 'Feed the loop', description: 'Use your throw hand to feed slack into the gap.', timestamp: 15, duration: 20, tipText: 'The loop should go into the gap against the spin direction' },
      { id: 's-005-3', order: 3, title: 'Pull and catch', description: 'Pull your throw hand up as the yo-yo binds and returns.', timestamp: 35, duration: 15 },
      { id: 's-005-4', order: 4, title: 'Practice variations', description: 'Try front-style and side-style binds.', timestamp: 50, duration: 10 },
    ],
    prerequisites: ['trick-006'],
    commonMistakes: [
      'Feeding slack in the wrong direction',
      'Not feeding enough string into the gap',
      'Pulling up too early',
    ],
    tips: [
      'The direction of the loop matters - against the spin!',
      'Start with lots of slack until you get the feel',
      'A tight bind comes with practice',
    ],
    estimatedMinutes: 45,
  },

  // BEGINNER-INTERMEDIATE TRICKS (Difficulty 2)
  {
    id: 'trick-006',
    slug: 'trapeze',
    name: 'Trapeze',
    description: 'The most fundamental side-mount. Land the yo-yo on the string segment in front of your non-throw hand.',
    difficulty: 2,
    style: '1A',
    genre: 'string',
    xpReward: 150,
    thumbnailUrl: 'https://example.com/thumbnails/trapeze.jpg',
    previewGif: 'https://example.com/gifs/trapeze.gif',
    videos: [
      { id: 'v-006-1', angle: 'front', url: 'https://example.com/videos/trapeze-front.mp4', duration: 55, thumbnailUrl: 'https://example.com/thumbnails/trapeze-front.jpg' },
      { id: 'v-006-2', angle: 'side', url: 'https://example.com/videos/trapeze-side.mp4', duration: 55, thumbnailUrl: 'https://example.com/thumbnails/trapeze-side.jpg' },
    ],
    steps: [
      { id: 's-006-1', order: 1, title: 'Breakaway throw', description: 'Perform a strong breakaway throw.', timestamp: 0, duration: 12 },
      { id: 's-006-2', order: 2, title: 'Extend index finger', description: 'Point your non-throw hand index finger and let the string wrap around it.', timestamp: 12, duration: 15 },
      { id: 's-006-3', order: 3, title: 'Land the yo-yo', description: 'Guide the yo-yo to land on the string segment in front of your finger.', timestamp: 27, duration: 18, tipText: 'Keep the string segments parallel' },
      { id: 's-006-4', order: 4, title: 'Balance and dismount', description: 'Keep the yo-yo balanced, then swing off to bind or continue.', timestamp: 45, duration: 10 },
    ],
    prerequisites: ['trick-004'],
    commonMistakes: [
      'Not keeping strings parallel causes the yo-yo to roll off',
      'Finger too close to the yo-yo - give it space',
      'Breakaway not in a straight plane',
    ],
    tips: [
      'Use your whole arm to guide the yo-yo, not just your finger',
      'A slower, controlled breakaway is easier to land',
      'Practice the motion without landing first',
    ],
    estimatedMinutes: 30,
  },
  {
    id: 'trick-007',
    slug: 'brain-twister',
    name: 'Brain Twister',
    description: 'A classic front-style trick featuring a flip over the finger. One of the original advanced tricks.',
    difficulty: 2,
    style: '1A',
    genre: 'string',
    xpReward: 175,
    thumbnailUrl: 'https://example.com/thumbnails/brain-twister.jpg',
    previewGif: 'https://example.com/gifs/brain-twister.gif',
    videos: [
      { id: 'v-007-1', angle: 'front', url: 'https://example.com/videos/brain-twister-front.mp4', duration: 65, thumbnailUrl: 'https://example.com/thumbnails/brain-twister-front.jpg' },
    ],
    steps: [
      { id: 's-007-1', order: 1, title: 'Sleeper', description: 'Throw a strong front sleeper.', timestamp: 0, duration: 10 },
      { id: 's-007-2', order: 2, title: 'Mount', description: 'Bring yo-yo up and land on string off your index finger.', timestamp: 10, duration: 15 },
      { id: 's-007-3', order: 3, title: 'Flip over', description: 'Push the yo-yo over your finger in a somersault motion.', timestamp: 25, duration: 20 },
      { id: 's-007-4', order: 4, title: 'Repeat and dismount', description: 'Do multiple flips then dismount and bind.', timestamp: 45, duration: 20 },
    ],
    prerequisites: ['trick-001', 'trick-005'],
    commonMistakes: [
      'Not pushing hard enough through the flip',
      'Losing tension on the string',
    ],
    tips: [
      'Keep the string taut throughout',
      'The flip should be smooth and controlled',
    ],
    estimatedMinutes: 35,
  },
  {
    id: 'trick-008',
    slug: 'rock-the-baby',
    name: 'Rock the Baby',
    description: 'A classic picture trick where you create a triangle frame and swing the yo-yo through it like a baby in a cradle.',
    difficulty: 2,
    style: '1A',
    genre: 'string',
    xpReward: 125,
    thumbnailUrl: 'https://example.com/thumbnails/rock-the-baby.jpg',
    previewGif: 'https://example.com/gifs/rock-the-baby.gif',
    videos: [
      { id: 'v-008-1', angle: 'front', url: 'https://example.com/videos/rock-the-baby-front.mp4', duration: 70, thumbnailUrl: 'https://example.com/thumbnails/rock-the-baby-front.jpg' },
    ],
    steps: [
      { id: 's-008-1', order: 1, title: 'Sleeper', description: 'Throw a sleeper with plenty of spin.', timestamp: 0, duration: 10 },
      { id: 's-008-2', order: 2, title: 'Form triangle', description: 'Create a triangle shape with the string using both hands.', timestamp: 10, duration: 25 },
      { id: 's-008-3', order: 3, title: 'Rock', description: 'Swing the yo-yo back and forth through the triangle.', timestamp: 35, duration: 25 },
      { id: 's-008-4', order: 4, title: 'Dismount', description: 'Release the formation and bind.', timestamp: 60, duration: 10 },
    ],
    prerequisites: ['trick-001'],
    commonMistakes: [
      'Triangle too small for the yo-yo to pass through',
      'Running out of spin time',
    ],
    tips: [
      'Work quickly but smoothly',
      'Make the triangle bigger than you think you need',
    ],
    estimatedMinutes: 25,
  },
  {
    id: 'trick-009',
    slug: 'double-or-nothing',
    name: 'Double or Nothing',
    description: 'Wrap the string twice around your fingers before landing the yo-yo. Foundation for many advanced tricks.',
    difficulty: 2,
    style: '1A',
    genre: 'string',
    xpReward: 200,
    thumbnailUrl: 'https://example.com/thumbnails/double-or-nothing.jpg',
    previewGif: 'https://example.com/gifs/double-or-nothing.gif',
    videos: [
      { id: 'v-009-1', angle: 'front', url: 'https://example.com/videos/double-or-nothing-front.mp4', duration: 60, thumbnailUrl: 'https://example.com/thumbnails/double-or-nothing-front.jpg' },
      { id: 'v-009-2', angle: 'overhead', url: 'https://example.com/videos/double-or-nothing-overhead.mp4', duration: 60, thumbnailUrl: 'https://example.com/thumbnails/double-or-nothing-overhead.jpg' },
    ],
    steps: [
      { id: 's-009-1', order: 1, title: 'Breakaway', description: 'Throw a breakaway.', timestamp: 0, duration: 12 },
      { id: 's-009-2', order: 2, title: 'First wrap', description: 'Wrap over your index finger as yo-yo swings by.', timestamp: 12, duration: 15 },
      { id: 's-009-3', order: 3, title: 'Second wrap', description: 'Continue the swing and wrap over your throw hand index finger.', timestamp: 27, duration: 15 },
      { id: 's-009-4', order: 4, title: 'Land', description: 'Land on the outer string segment.', timestamp: 42, duration: 18, tipText: 'Land on the furthest string from your body' },
    ],
    prerequisites: ['trick-006'],
    commonMistakes: [
      'Landing on the wrong string segment',
      'Wraps too tight - leave space for the yo-yo',
    ],
    tips: [
      'Count the wraps as you go',
      'The yo-yo should land on the outermost string',
    ],
    estimatedMinutes: 40,
  },

  // INTERMEDIATE TRICKS (Difficulty 3)
  {
    id: 'trick-010',
    slug: 'split-the-atom',
    name: 'Split the Atom',
    description: 'A flowing combo that moves through multiple mounts with smooth transitions. A cornerstone intermediate trick.',
    difficulty: 3,
    style: '1A',
    genre: 'flow',
    xpReward: 250,
    thumbnailUrl: 'https://example.com/thumbnails/split-the-atom.jpg',
    previewGif: 'https://example.com/gifs/split-the-atom.gif',
    videos: [
      { id: 'v-010-1', angle: 'front', url: 'https://example.com/videos/split-the-atom-front.mp4', duration: 80, thumbnailUrl: 'https://example.com/thumbnails/split-the-atom-front.jpg' },
      { id: 'v-010-2', angle: 'side', url: 'https://example.com/videos/split-the-atom-side.mp4', duration: 80, thumbnailUrl: 'https://example.com/thumbnails/split-the-atom-side.jpg' },
    ],
    steps: [
      { id: 's-010-1', order: 1, title: 'Split bottom mount', description: 'Enter into a split bottom mount from a front throw.', timestamp: 0, duration: 15 },
      { id: 's-010-2', order: 2, title: 'Roll over', description: 'Roll the yo-yo over your throw hand finger toward you.', timestamp: 15, duration: 20 },
      { id: 's-010-3', order: 3, title: 'Pass through', description: 'Pass the yo-yo through the loop and roll back.', timestamp: 35, duration: 25 },
      { id: 's-010-4', order: 4, title: 'Dismount', description: 'Exit the mount and bind.', timestamp: 60, duration: 20 },
    ],
    prerequisites: ['trick-007'],
    commonMistakes: [
      'Losing string tension during transitions',
      'Rolling too fast and losing control',
    ],
    tips: [
      'Think of it as a continuous flow',
      'Keep movements smooth, not jerky',
    ],
    estimatedMinutes: 45,
  },
  {
    id: 'trick-011',
    slug: 'mach-5',
    name: 'Mach 5',
    description: 'A hypnotic repeating trick where the yo-yo rapidly passes back and forth between string segments.',
    difficulty: 3,
    style: '1A',
    genre: 'speed',
    xpReward: 275,
    thumbnailUrl: 'https://example.com/thumbnails/mach-5.jpg',
    previewGif: 'https://example.com/gifs/mach-5.gif',
    videos: [
      { id: 'v-011-1', angle: 'front', url: 'https://example.com/videos/mach-5-front.mp4', duration: 75, thumbnailUrl: 'https://example.com/thumbnails/mach-5-front.jpg' },
      { id: 'v-011-2', angle: 'pov', url: 'https://example.com/videos/mach-5-pov.mp4', duration: 75, thumbnailUrl: 'https://example.com/thumbnails/mach-5-pov.jpg' },
    ],
    steps: [
      { id: 's-011-1', order: 1, title: 'Split bottom mount', description: 'Get into a split bottom mount.', timestamp: 0, duration: 12 },
      { id: 's-011-2', order: 2, title: 'First pass', description: 'Push the yo-yo forward through the front string.', timestamp: 12, duration: 18 },
      { id: 's-011-3', order: 3, title: 'Reverse pass', description: 'Pull back and push through in the opposite direction.', timestamp: 30, duration: 20 },
      { id: 's-011-4', order: 4, title: 'Repeat rapidly', description: 'Continue the back-and-forth motion, building speed.', timestamp: 50, duration: 25, tipText: 'Start slow and gradually increase speed' },
    ],
    prerequisites: ['trick-010'],
    commonMistakes: [
      'Going too fast too soon',
      'Not keeping the yo-yo centered',
    ],
    tips: [
      'Focus on rhythm over speed initially',
      'The motion should be effortless once you find the flow',
    ],
    estimatedMinutes: 40,
  },
  {
    id: 'trick-012',
    slug: 'cold-fusion',
    name: 'Cold Fusion',
    description: 'A technical trick featuring multiple wraps and a smooth under-mount transition. A test of precision.',
    difficulty: 3,
    style: '1A',
    genre: 'tech',
    xpReward: 300,
    thumbnailUrl: 'https://example.com/thumbnails/cold-fusion.jpg',
    previewGif: 'https://example.com/gifs/cold-fusion.gif',
    videos: [
      { id: 'v-012-1', angle: 'front', url: 'https://example.com/videos/cold-fusion-front.mp4', duration: 90, thumbnailUrl: 'https://example.com/thumbnails/cold-fusion-front.jpg' },
    ],
    steps: [
      { id: 's-012-1', order: 1, title: 'Trapeze', description: 'Start from a trapeze.', timestamp: 0, duration: 12 },
      { id: 's-012-2', order: 2, title: 'Underpass', description: 'Pass the yo-yo under your throw hand.', timestamp: 12, duration: 20 },
      { id: 's-012-3', order: 3, title: 'Wrap and roll', description: 'Wrap around your non-throw finger and roll through.', timestamp: 32, duration: 30 },
      { id: 's-012-4', order: 4, title: 'Exit', description: 'Unwind the wraps and bind.', timestamp: 62, duration: 28 },
    ],
    prerequisites: ['trick-006', 'trick-009'],
    commonMistakes: [
      'Wraps too tight to unwind',
      'Losing yo-yo momentum in transitions',
    ],
    tips: [
      'Practice each segment separately first',
      'Keep string tension consistent throughout',
    ],
    estimatedMinutes: 50,
  },
  {
    id: 'trick-013',
    slug: 'trapeze-and-brother',
    name: 'Trapeze and His Brother',
    description: 'An extension of trapeze with an additional wrap, opening up many combo possibilities.',
    difficulty: 3,
    style: '1A',
    genre: 'string',
    xpReward: 225,
    thumbnailUrl: 'https://example.com/thumbnails/trapeze-brother.jpg',
    previewGif: 'https://example.com/gifs/trapeze-brother.gif',
    videos: [
      { id: 'v-013-1', angle: 'front', url: 'https://example.com/videos/trapeze-brother-front.mp4', duration: 55, thumbnailUrl: 'https://example.com/thumbnails/trapeze-brother-front.jpg' },
    ],
    steps: [
      { id: 's-013-1', order: 1, title: 'Trapeze', description: 'Land a solid trapeze.', timestamp: 0, duration: 15 },
      { id: 's-013-2', order: 2, title: 'Dismount forward', description: 'Pop the yo-yo off toward your throw hand.', timestamp: 15, duration: 12 },
      { id: 's-013-3', order: 3, title: 'Additional wrap', description: 'Wrap around your throw hand finger.', timestamp: 27, duration: 15 },
      { id: 's-013-4', order: 4, title: 'Land brother', description: 'Land on the new outer string segment.', timestamp: 42, duration: 13 },
    ],
    prerequisites: ['trick-006'],
    commonMistakes: [
      'Not popping high enough for the wrap',
      'Landing on wrong string segment',
    ],
    tips: [
      'The pop should be controlled, not wild',
      'Think of it as trapeze with an extra loop',
    ],
    estimatedMinutes: 35,
  },
  {
    id: 'trick-014',
    slug: 'eli-hops',
    name: 'Eli Hops',
    description: 'Pop the yo-yo straight up from a trapeze and catch it back on the string. Named after Eli Lennox.',
    difficulty: 3,
    style: '1A',
    genre: 'hops',
    xpReward: 275,
    thumbnailUrl: 'https://example.com/thumbnails/eli-hops.jpg',
    previewGif: 'https://example.com/gifs/eli-hops.gif',
    videos: [
      { id: 'v-014-1', angle: 'front', url: 'https://example.com/videos/eli-hops-front.mp4', duration: 65, thumbnailUrl: 'https://example.com/thumbnails/eli-hops-front.jpg' },
      { id: 'v-014-2', angle: 'side', url: 'https://example.com/videos/eli-hops-side.mp4', duration: 65, thumbnailUrl: 'https://example.com/thumbnails/eli-hops-side.jpg' },
    ],
    steps: [
      { id: 's-014-1', order: 1, title: 'Trapeze', description: 'Start from trapeze.', timestamp: 0, duration: 12 },
      { id: 's-014-2', order: 2, title: 'Pop up', description: 'Simultaneously spread your hands apart, popping yo-yo upward.', timestamp: 12, duration: 18 },
      { id: 's-014-3', order: 3, title: 'Catch', description: 'Bring hands back together to catch on the string.', timestamp: 30, duration: 18 },
      { id: 's-014-4', order: 4, title: 'Repeat', description: 'Continue hopping, building height and rhythm.', timestamp: 48, duration: 17, tipText: 'Height comes from both hands, not just pulling' },
    ],
    prerequisites: ['trick-006'],
    commonMistakes: [
      'Only using one hand to pop',
      'Yo-yo tilting during the hop',
    ],
    tips: [
      'Both hands work together - spread and close',
      'Start with small hops, build up height gradually',
    ],
    estimatedMinutes: 40,
  },

  // ADVANCED TRICKS (Difficulty 4)
  {
    id: 'trick-015',
    slug: 'spirit-bomb',
    name: 'Spirit Bomb',
    description: 'An iconic slack trick with a dramatic string rejection. One of the most recognizable advanced tricks.',
    difficulty: 4,
    style: '1A',
    genre: 'slack',
    xpReward: 400,
    thumbnailUrl: 'https://example.com/thumbnails/spirit-bomb.jpg',
    previewGif: 'https://example.com/gifs/spirit-bomb.gif',
    videos: [
      { id: 'v-015-1', angle: 'front', url: 'https://example.com/videos/spirit-bomb-front.mp4', duration: 120, thumbnailUrl: 'https://example.com/thumbnails/spirit-bomb-front.jpg' },
      { id: 'v-015-2', angle: 'side', url: 'https://example.com/videos/spirit-bomb-side.mp4', duration: 120, thumbnailUrl: 'https://example.com/thumbnails/spirit-bomb-side.jpg' },
      { id: 'v-015-3', angle: 'pov', url: 'https://example.com/videos/spirit-bomb-pov.mp4', duration: 120, thumbnailUrl: 'https://example.com/thumbnails/spirit-bomb-pov.jpg' },
    ],
    steps: [
      { id: 's-015-1', order: 1, title: 'Wrist mount', description: 'Enter a wrist mount from a breakaway.', timestamp: 0, duration: 25 },
      { id: 's-015-2', order: 2, title: 'Pop and cross', description: 'Pop the yo-yo and cross your arms.', timestamp: 25, duration: 30 },
      { id: 's-015-3', order: 3, title: 'Thread through', description: 'Thread the yo-yo through the triangle formation.', timestamp: 55, duration: 35 },
      { id: 's-015-4', order: 4, title: 'Rejection', description: 'Reject the strings for the dramatic finish.', timestamp: 90, duration: 30, tipText: 'The rejection should be smooth and clean' },
    ],
    prerequisites: ['trick-006', 'trick-012'],
    commonMistakes: [
      'Wrist mount not secure enough',
      'Missing the thread-through',
      'Sloppy rejection',
    ],
    tips: [
      'Master the wrist mount first',
      'The cross should happen at the right moment',
      'Practice the rejection motion separately',
    ],
    estimatedMinutes: 90,
  },
  {
    id: 'trick-016',
    slug: 'kamikaze',
    name: 'Kamikaze',
    description: 'A legendary trick created by Shinji Saito. Features multiple mount transitions and technical elements.',
    difficulty: 4,
    style: '1A',
    genre: 'tech',
    xpReward: 450,
    thumbnailUrl: 'https://example.com/thumbnails/kamikaze.jpg',
    previewGif: 'https://example.com/gifs/kamikaze.gif',
    videos: [
      { id: 'v-016-1', angle: 'front', url: 'https://example.com/videos/kamikaze-front.mp4', duration: 150, thumbnailUrl: 'https://example.com/thumbnails/kamikaze-front.jpg' },
    ],
    steps: [
      { id: 's-016-1', order: 1, title: 'Houdini mount', description: 'Enter the Houdini mount.', timestamp: 0, duration: 30 },
      { id: 's-016-2', order: 2, title: 'Multiple wraps', description: 'Execute the signature wrap sequence.', timestamp: 30, duration: 45 },
      { id: 's-016-3', order: 3, title: 'Roll through', description: 'Roll through the formation.', timestamp: 75, duration: 40 },
      { id: 's-016-4', order: 4, title: 'Dramatic exit', description: 'Unwind and finish with style.', timestamp: 115, duration: 35 },
    ],
    prerequisites: ['trick-010', 'trick-012', 'trick-009'],
    commonMistakes: [
      'Getting lost in the wraps',
      'String tension issues',
    ],
    tips: [
      'Break it into smaller sections',
      'The Houdini mount is crucial - nail it first',
    ],
    estimatedMinutes: 120,
  },
  {
    id: 'trick-017',
    slug: 'black-hops',
    name: 'Black Hops',
    description: 'A horizontal hopping trick that requires precise control of a sideways-spinning yo-yo.',
    difficulty: 4,
    style: '1A',
    genre: 'horizontal',
    xpReward: 425,
    thumbnailUrl: 'https://example.com/thumbnails/black-hops.jpg',
    previewGif: 'https://example.com/gifs/black-hops.gif',
    videos: [
      { id: 'v-017-1', angle: 'front', url: 'https://example.com/videos/black-hops-front.mp4', duration: 80, thumbnailUrl: 'https://example.com/thumbnails/black-hops-front.jpg' },
      { id: 'v-017-2', angle: 'overhead', url: 'https://example.com/videos/black-hops-overhead.mp4', duration: 80, thumbnailUrl: 'https://example.com/thumbnails/black-hops-overhead.jpg' },
    ],
    steps: [
      { id: 's-017-1', order: 1, title: 'Horizontal throw', description: 'Execute a clean horizontal breakaway.', timestamp: 0, duration: 15 },
      { id: 's-017-2', order: 2, title: 'Horizontal trapeze', description: 'Land in horizontal trapeze position.', timestamp: 15, duration: 20 },
      { id: 's-017-3', order: 3, title: 'Pop hops', description: 'Pop the yo-yo up while maintaining horizontal spin.', timestamp: 35, duration: 25 },
      { id: 's-017-4', order: 4, title: 'Multiple hops', description: 'Continue hopping while fighting precession.', timestamp: 60, duration: 20, tipText: 'Adjust for precession as you hop' },
    ],
    prerequisites: ['trick-014'],
    commonMistakes: [
      'Yo-yo tilting back to vertical',
      'Precession throwing off catches',
    ],
    tips: [
      'Horizontal play requires constant adjustment',
      'Start with just one or two hops',
    ],
    estimatedMinutes: 75,
  },
  {
    id: 'trick-018',
    slug: 'seasick',
    name: 'Seasick',
    description: 'A mesmerizing trick where the yo-yo swings in a figure-8 pattern. Creates a beautiful visual effect.',
    difficulty: 4,
    style: '1A',
    genre: 'flow',
    xpReward: 350,
    thumbnailUrl: 'https://example.com/thumbnails/seasick.jpg',
    previewGif: 'https://example.com/gifs/seasick.gif',
    videos: [
      { id: 'v-018-1', angle: 'front', url: 'https://example.com/videos/seasick-front.mp4', duration: 70, thumbnailUrl: 'https://example.com/thumbnails/seasick-front.jpg' },
    ],
    steps: [
      { id: 's-018-1', order: 1, title: 'Split bottom mount', description: 'Enter split bottom mount.', timestamp: 0, duration: 12 },
      { id: 's-018-2', order: 2, title: 'Initiate swing', description: 'Start swinging the yo-yo in an arc.', timestamp: 12, duration: 20 },
      { id: 's-018-3', order: 3, title: 'Figure-8 motion', description: 'Guide into a continuous figure-8 pattern.', timestamp: 32, duration: 25 },
      { id: 's-018-4', order: 4, title: 'Maintain rhythm', description: 'Keep the swinging motion going smoothly.', timestamp: 57, duration: 13 },
    ],
    prerequisites: ['trick-010'],
    commonMistakes: [
      'Motion too jerky - should be smooth',
      'Losing the rhythm',
    ],
    tips: [
      'Feel the weight of the yo-yo guide the motion',
      'Your hands move in opposition to each other',
    ],
    estimatedMinutes: 55,
  },

  // MASTER TRICKS (Difficulty 5)
  {
    id: 'trick-019',
    slug: 'rancid-milk',
    name: 'Rancid Milk',
    description: 'An extremely technical trick featuring complex slack elements and precise timing. A true test of mastery.',
    difficulty: 5,
    style: '1A',
    genre: 'slack',
    xpReward: 600,
    thumbnailUrl: 'https://example.com/thumbnails/rancid-milk.jpg',
    previewGif: 'https://example.com/gifs/rancid-milk.gif',
    videos: [
      { id: 'v-019-1', angle: 'front', url: 'https://example.com/videos/rancid-milk-front.mp4', duration: 180, thumbnailUrl: 'https://example.com/thumbnails/rancid-milk-front.jpg' },
      { id: 'v-019-2', angle: 'side', url: 'https://example.com/videos/rancid-milk-side.mp4', duration: 180, thumbnailUrl: 'https://example.com/thumbnails/rancid-milk-side.jpg' },
      { id: 'v-019-3', angle: 'pov', url: 'https://example.com/videos/rancid-milk-pov.mp4', duration: 180, thumbnailUrl: 'https://example.com/thumbnails/rancid-milk-pov.jpg' },
    ],
    steps: [
      { id: 's-019-1', order: 1, title: 'Initial mount', description: 'Enter the complex starting mount.', timestamp: 0, duration: 35 },
      { id: 's-019-2', order: 2, title: 'Slack sequence 1', description: 'Execute the first slack whip.', timestamp: 35, duration: 45 },
      { id: 's-019-3', order: 3, title: 'Technical section', description: 'Navigate the intricate string work.', timestamp: 80, duration: 55 },
      { id: 's-019-4', order: 4, title: 'Final slack', description: 'Complete with the signature ending.', timestamp: 135, duration: 45 },
    ],
    prerequisites: ['trick-015', 'trick-016'],
    commonMistakes: [
      'Slack timing off by milliseconds',
      'String tension changes ruining elements',
    ],
    tips: [
      'This trick took the creator months to perfect',
      'Every micro-movement matters',
      'Film yourself to spot errors',
    ],
    estimatedMinutes: 180,
  },
  {
    id: 'trick-020',
    slug: 'kwijibo',
    name: 'Kwijibo',
    description: 'A flashy trick with crossed arms and multiple pop transitions. A crowd favorite when performed smoothly.',
    difficulty: 4,
    style: '1A',
    genre: 'tech',
    xpReward: 375,
    thumbnailUrl: 'https://example.com/thumbnails/kwijibo.jpg',
    previewGif: 'https://example.com/gifs/kwijibo.gif',
    videos: [
      { id: 'v-020-1', angle: 'front', url: 'https://example.com/videos/kwijibo-front.mp4', duration: 85, thumbnailUrl: 'https://example.com/thumbnails/kwijibo-front.jpg' },
    ],
    steps: [
      { id: 's-020-1', order: 1, title: 'Double or nothing', description: 'Start from double or nothing.', timestamp: 0, duration: 15 },
      { id: 's-020-2', order: 2, title: 'First cross', description: 'Pop yo-yo and cross your arms (right over left).', timestamp: 15, duration: 20 },
      { id: 's-020-3', order: 3, title: 'Second cross', description: 'Pop again and reverse the cross (left over right).', timestamp: 35, duration: 25 },
      { id: 's-020-4', order: 4, title: 'Uncross and land', description: 'Final pop to uncross and land in trapeze.', timestamp: 60, duration: 25 },
    ],
    prerequisites: ['trick-009'],
    commonMistakes: [
      'Crossing arms at wrong time',
      'Not popping high enough for clean crosses',
    ],
    tips: [
      'The crosses should feel natural after practice',
      'Pop straight up for cleaner catches',
    ],
    estimatedMinutes: 65,
  },
  {
    id: 'trick-021',
    slug: 'yuuki-slack',
    name: 'Yuuki Slack',
    description: 'A signature slack trick by Yuuki Spencer. Features a unique slack catch that looks like magic.',
    difficulty: 5,
    style: '1A',
    genre: 'slack',
    xpReward: 550,
    thumbnailUrl: 'https://example.com/thumbnails/yuuki-slack.jpg',
    previewGif: 'https://example.com/gifs/yuuki-slack.gif',
    videos: [
      { id: 'v-021-1', angle: 'front', url: 'https://example.com/videos/yuuki-slack-front.mp4', duration: 100, thumbnailUrl: 'https://example.com/thumbnails/yuuki-slack-front.jpg' },
    ],
    steps: [
      { id: 's-021-1', order: 1, title: 'Trapeze', description: 'Start from trapeze.', timestamp: 0, duration: 12 },
      { id: 's-021-2', order: 2, title: 'Pop up', description: 'Pop yo-yo up and let string go slack.', timestamp: 12, duration: 25 },
      { id: 's-021-3', order: 3, title: 'Whip catch', description: 'Whip the slack around and catch in formation.', timestamp: 37, duration: 35 },
      { id: 's-021-4', order: 4, title: 'Clean exit', description: 'Dismount cleanly.', timestamp: 72, duration: 28 },
    ],
    prerequisites: ['trick-015', 'trick-006'],
    commonMistakes: [
      'Slack timing completely off',
      'Whip motion incorrect',
    ],
    tips: [
      'The slack has a specific rhythm - find it',
      'Watch multiple angles of this trick',
    ],
    estimatedMinutes: 90,
  },
  {
    id: 'trick-022',
    slug: 'boingy-boing',
    name: 'Boingy Boing',
    description: 'A rhythmic bouncing trick that looks simple but requires precise timing and control.',
    difficulty: 3,
    style: '1A',
    genre: 'speed',
    xpReward: 275,
    thumbnailUrl: 'https://example.com/thumbnails/boingy-boing.jpg',
    previewGif: 'https://example.com/gifs/boingy-boing.gif',
    videos: [
      { id: 'v-022-1', angle: 'front', url: 'https://example.com/videos/boingy-boing-front.mp4', duration: 60, thumbnailUrl: 'https://example.com/thumbnails/boingy-boing-front.jpg' },
    ],
    steps: [
      { id: 's-022-1', order: 1, title: 'Split bottom mount', description: 'Enter split bottom mount.', timestamp: 0, duration: 12 },
      { id: 's-022-2', order: 2, title: 'First bounce', description: 'Bounce yo-yo to the outside string.', timestamp: 12, duration: 15 },
      { id: 's-022-3', order: 3, title: 'Back bounce', description: 'Bounce back to inside string.', timestamp: 27, duration: 15 },
      { id: 's-022-4', order: 4, title: 'Continuous', description: 'Keep bouncing in rhythm.', timestamp: 42, duration: 18, tipText: 'Use your non-throw hand to drive the motion' },
    ],
    prerequisites: ['trick-010'],
    commonMistakes: [
      'Using throw hand instead of non-throw hand',
      'Bounces out of plane',
    ],
    tips: [
      'Your non-throw hand is the driver',
      'Find the natural resonance',
    ],
    estimatedMinutes: 50,
  },

  // 5A TRICKS
  {
    id: 'trick-023',
    slug: '5a-360',
    name: '5A 360',
    description: 'The fundamental 5A trick - spin the counterweight in a full circle while the yo-yo is on the string.',
    difficulty: 3,
    style: '5A',
    genre: 'basics',
    xpReward: 300,
    thumbnailUrl: 'https://example.com/thumbnails/5a-360.jpg',
    previewGif: 'https://example.com/gifs/5a-360.gif',
    videos: [
      { id: 'v-023-1', angle: 'front', url: 'https://example.com/videos/5a-360-front.mp4', duration: 50, thumbnailUrl: 'https://example.com/thumbnails/5a-360-front.jpg' },
    ],
    steps: [
      { id: 's-023-1', order: 1, title: 'Breakaway', description: 'Throw a breakaway (with counterweight).', timestamp: 0, duration: 10 },
      { id: 's-023-2', order: 2, title: 'Land trapeze', description: 'Land in trapeze position.', timestamp: 10, duration: 12 },
      { id: 's-023-3', order: 3, title: 'Release CW', description: 'Release the counterweight and let it swing.', timestamp: 22, duration: 15 },
      { id: 's-023-4', order: 4, title: 'Full rotation', description: 'Guide the counterweight in a full 360.', timestamp: 37, duration: 13 },
    ],
    prerequisites: ['trick-006'],
    commonMistakes: [
      'Counterweight hits you (wear safety glasses!)',
      'Not enough momentum for full rotation',
    ],
    tips: [
      'Start slow and controlled',
      '5A requires spatial awareness - be careful!',
    ],
    estimatedMinutes: 45,
  },
  {
    id: 'trick-024',
    slug: 'bee-sting',
    name: 'Bee Sting',
    description: 'A quick 5A whip trick where the counterweight wraps around and catches on the string.',
    difficulty: 4,
    style: '5A',
    genre: 'tech',
    xpReward: 400,
    thumbnailUrl: 'https://example.com/thumbnails/bee-sting.jpg',
    previewGif: 'https://example.com/gifs/bee-sting.gif',
    videos: [
      { id: 'v-024-1', angle: 'front', url: 'https://example.com/videos/bee-sting-front.mp4', duration: 65, thumbnailUrl: 'https://example.com/thumbnails/bee-sting-front.jpg' },
    ],
    steps: [
      { id: 's-024-1', order: 1, title: 'Trapeze', description: 'Start in 5A trapeze.', timestamp: 0, duration: 12 },
      { id: 's-024-2', order: 2, title: 'Pop', description: 'Pop yo-yo up and release CW.', timestamp: 12, duration: 18 },
      { id: 's-024-3', order: 3, title: 'Whip CW', description: 'Whip the counterweight around.', timestamp: 30, duration: 20 },
      { id: 's-024-4', order: 4, title: 'Catch on string', description: 'Catch the CW on the string as yo-yo lands.', timestamp: 50, duration: 15 },
    ],
    prerequisites: ['trick-023'],
    commonMistakes: [
      'Timing between pop and whip off',
      'CW going wrong direction',
    ],
    tips: [
      'The timing window is small',
      'Practice the whip motion first without yo-yo',
    ],
    estimatedMinutes: 70,
  },
];

export const getTrickById = (id: string): Trick | undefined => {
  return mockTricks.find(trick => trick.id === id);
};

export const getTrickBySlug = (slug: string): Trick | undefined => {
  return mockTricks.find(trick => trick.slug === slug);
};

export const getTricksByDifficulty = (difficulty: number): Trick[] => {
  return mockTricks.filter(trick => trick.difficulty === difficulty);
};

export const getTricksByStyle = (style: string): Trick[] => {
  return mockTricks.filter(trick => trick.style === style);
};

export const getTricksByGenre = (genre: string): Trick[] => {
  return mockTricks.filter(trick => trick.genre === genre);
};

export const getPrerequisiteChain = (trickId: string): Trick[] => {
  const trick = getTrickById(trickId);
  if (!trick) return [];

  const chain: Trick[] = [];
  const visited = new Set<string>();

  const buildChain = (id: string) => {
    if (visited.has(id)) return;
    visited.add(id);

    const t = getTrickById(id);
    if (!t) return;

    t.prerequisites.forEach(prereqId => buildChain(prereqId));
    chain.push(t);
  };

  trick.prerequisites.forEach(prereqId => buildChain(prereqId));
  return chain;
};
