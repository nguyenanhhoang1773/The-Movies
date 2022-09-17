import { IconMain } from "~/components/icons";
import { Link } from "react-router-dom";
import routes from "~/config/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "~/components/Button";
import {
  faCaretDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
function Header() {
  return (
    <div className="fixed flex justify-center items-center h-14 top-0 w-full bg-neutral-900">
      <div className="flex items-center h-full w-11/12 justify-between">
        <div className="flex ">
          <Link to={routes.Home} className="flex items-center justify-center">
            <IconMain />
          </Link>
          <Button to={routes.Home}>
            <span>ngu</span>
            Trang chủ
          </Button>
          <Button to={routes.User}>Phim bộ</Button>
          {/* <Button>Phim lẻ</Button> */}
          <Button to={routes.Profile}>
            Thể loại
            <span>
              <FontAwesomeIcon
                className="text-current ml-2"
                icon={faCaretDown}
              />
            </span>
          </Button>
        </div>
        <div className="flex bg-zinc-700 rounded-full items-center  ">
          <input
            placeholder="Tìm kiếm"
            className="outline-0 rounded-full h-9 w-[280px] bg-inherit text-sm p-2 py-3 text-zinc-200"
          />
          <span className="px-4 border-l-[1px] border-[color:var(--primary)] text-[color:var(--primary)]">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
