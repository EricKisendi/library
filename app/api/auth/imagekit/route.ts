import config from '@/lib/config';
import ImageKit from 'imagekit';

const { 
    env: {
        imagekit: { publicKey, privateKey, urlEndpoint},
    },
} = config;

const imagekit = new ImageKit(opts: {
    publicKey,
    privateKey,
    urlEndpoint,
});

export async function GET() {
    return NextResponse.json(imagekit.getAuthenticationParameters())
}