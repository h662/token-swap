import { MenuItem } from "@/components/ui/menu";
import { useNavigate } from "react-router-dom";

interface MenuButtonProps {
  value: string;
  href: string;
}

function MenuButton({ value, href }: MenuButtonProps) {
  const navigate = useNavigate();

  const navigatePage = () => {
    navigate(href);
  };

  return (
    <MenuItem
      _hover={{
        bgColor: "green.200",
      }}
      value={value}
      onClick={navigatePage}
    >
      {value}
    </MenuItem>
  );
}

export default MenuButton;
