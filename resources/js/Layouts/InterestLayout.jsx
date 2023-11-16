
import { Link } from "@inertiajs/react";
import logo from "../../assets/svg/logo.svg";
import AppLayout from "./AppLayout";
import Toast from "@/Components/Toast/Toast";



const InterestLayout = ({children}) => {

  const handleContextMenu = (e) => {
    e.preventDefault(); 
  };
    return (

            <div onContextMenu={handleContextMenu}>
 <Toast />
            <header className="p-4 bg-transparent ">
            <div className="container mx-auto px-5 xl:px-0  bg-transparent">
              <div className="grid grid-cols-12 gap-6 flex items-center">
                <div className="col-span-12">
                  <div className="text-center flex justify-center">
                    <div>
                    <Link href={route('welcome')}>   <img className="h-10 object-cover" src={logo} alt="" /> </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
                <section className="page">
                    {children}
                </section>
            </div>

    );

}
InterestLayout.layout = (page) => <AppLayout children={page} title="" />;
export default InterestLayout;
