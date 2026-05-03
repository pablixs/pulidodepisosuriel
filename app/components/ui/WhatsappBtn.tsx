export default function WhatsappBtn() {
    return (
        <div className="fixed bottom-5 right-5 md:bottom-10 md:right-10 z-50 w-12 h-12 md:w-20 md:h-20 transition-transform  hover:translate-y-3 ">
            <a href="https://wa.me/5511999999999" className="flex group" target="_blank" rel="noopener noreferrer">
                <span className="absolute w-max right-20 top-5 p-2 bg-green-600 text-white font-bold rounded-xl hidden group-hover:block border-2 border-white">Envianos un mensaje</span>
                <img src="wsp.png" alt="WhatsApp" className="w-12 h-12 md:w-20 md:h-20" />
            </a>
        </div>
    );
}