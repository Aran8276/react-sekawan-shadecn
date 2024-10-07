import { Label } from "@radix-ui/react-label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";
import {
  Settings,
  Rabbit,
  Bird,
  Turtle,
  Search,
  ChevronDown,
  Languages,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  Drawer,
} from "./ui/drawer";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  ChangeEvent,
  RefObject,
  /* useContext*/ useEffect,
  useState,
} from "react";
// import { ModeToggle } from "./ThemeController";
import { toggleTheme } from "@/store/action/themeAction";
import { Theme } from "@/pages/Homepage";
import { useSelector, useDispatch } from "react-redux";
import FakeTheme from "./FakeTheme";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { setLang } from "@/store/action/langAction";
import { setUser } from "@/store/action/userAction";

export interface Language {
  lang: LanguageObject;
}

interface LanguageObject {
  lang: "en" | "id";
}

export interface User {
  lang: UserObject;
}

interface UserObject {
  lang: "admin" | "superadmin";
}

interface SelfProps {
  searchHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  searchRef: RefObject<HTMLInputElement>;
}

export const isId = (
  langString: "en" | "id",
  textId: string,
  textEn: string
) => {
  const output = langString == "id" ? textId : textEn;
  return output;
};

export default function Header(props: SelfProps) {
  const theme = useSelector((store: Theme) => store);
  const themeString = theme.theme.theme;
  const lang = useSelector((store: Language) => store);
  const langString = lang.lang.lang;
  const user = useSelector((store: User) => store);
  const userString = user.user.user;
  const root = window.document.documentElement;
  const [position, setPosition] = useState("id");
  const [positionAdmin, setPositionAdmin] = useState("id");
  const dispatchRedux = useDispatch();

  const changeLangHandler = (lang: string) => {
    setPosition(lang);
    dispatchRedux(setLang(lang));
  };

  const changeAdminHandler = (user: string) => {
    setPosition(user);
    dispatchRedux(setUser(user));
  };

  useEffect(() => {
    console.log(langString);
  }, [lang]);

  useEffect(() => {
    console.log(userString);
  }, [user]);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("theme");
    if (!storedTheme) {
      window.localStorage.setItem("theme", "dark");
    }
    if (storedTheme == "light") {
      root.classList.add("light");
      return;
    }
    if (storedTheme == "dark") {
      root.classList.add("dark");
      return;
    }
  }, []);

  useEffect(() => {
    console.log(theme.theme.theme);
    root.classList.remove("light", "dark");
    if (themeString == "dark") {
      root.classList.add("dark");
      window.localStorage.setItem("theme", "dark");
      return;
    }
    if (themeString == "light") {
      root.classList.add("light");
      window.localStorage.setItem("theme", "light");
      return;
    }
  }, [theme]);

  // const context = useContext(GlobalValue);

  // if (!context) {
  //   return null; // Handle the case where context is null
  // }

  // const { text, setText } = context;

  return (
    <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
      <h1 className="text-xl font-semibold">Aran8276</h1>
      <div className="pl-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex justify-between w-[7.25rem]">
              <ChevronDown className="size-4 relative top-[1px] self-center" />
              <p className="cursor-pointer">
                {userString == "admin" ? (
                  <span className="relative right-12">Admin</span>
                ) : (
                  <span className="">Super Admin</span>
                )}
              </p>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 mt-2 mr-3">
            <DropdownMenuLabel>
              <div className="flex space-x-4">
                <Languages className="size-4 self-center" />
                <span>Bahasa / Language</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={positionAdmin}
              onValueChange={changeAdminHandler}
            >
              <DropdownMenuRadioItem value="admin">Admin</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="superadmin">
                Super Admin
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Settings className="size-4" />
            <span className="sr-only">Settings</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[80vh]">
          <DrawerHeader>
            <DrawerTitle>Configuration</DrawerTitle>
            <DrawerDescription>
              Configure the settings for the model and messages.
            </DrawerDescription>
          </DrawerHeader>
          <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Settings
              </legend>
              <div className="grid gap-3">
                <Label htmlFor="model">Model</Label>
                <Select>
                  <SelectTrigger
                    id="model"
                    className="items-start [&_[data-description]]:hidden"
                  >
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="genesis">
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <Rabbit className="size-5" />
                        <div className="grid gap-0.5">
                          <p>
                            Neural{" "}
                            <span className="font-medium text-foreground">
                              Genesis
                            </span>
                          </p>
                          <p className="text-xs" data-description>
                            Our fastest model for general use cases.
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="explorer">
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <Bird className="size-5" />
                        <div className="grid gap-0.5">
                          <p>
                            Neural{" "}
                            <span className="font-medium text-foreground">
                              Explorer
                            </span>
                          </p>
                          <p className="text-xs" data-description>
                            Performance and speed for efficiency.
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="quantum">
                      <div className="flex items-start gap-3 text-muted-foreground">
                        <Turtle className="size-5" />
                        <div className="grid gap-0.5">
                          <p>
                            Neural{" "}
                            <span className="font-medium text-foreground">
                              Quantum
                            </span>
                          </p>
                          <p className="text-xs" data-description>
                            The most powerful model for complex computations.
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="temperature">Temperature</Label>
                <Input id="temperature" type="number" placeholder="0.4" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="top-p">Top P</Label>
                <Input id="top-p" type="number" placeholder="0.7" />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="top-k">Top K</Label>
                <Input id="top-k" type="number" placeholder="0.0" />
              </div>
            </fieldset>
            <fieldset className="grid gap-6 rounded-lg border p-4">
              <legend className="-ml-1 px-1 text-sm font-medium">
                Messages
              </legend>
              <div className="grid gap-3">
                <Label htmlFor="role">Role</Label>
                <Select defaultValue="system">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">System</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="assistant">Assistant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="content">Content</Label>
                <Textarea id="content" placeholder="You are a..." />
              </div>
            </fieldset>
          </form>
        </DrawerContent>
      </Drawer>
      <div className="relative ml-auto flex-1 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          ref={props.searchRef}
          onChange={props.searchHandler}
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
        />
      </div>
      {/* <ModeToggle /> */}
      <FakeTheme
        mode={themeString}
        onClickHandler={() => dispatchRedux(toggleTheme())}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex justify-between w-[5.50rem]">
            <ChevronDown className="size-4 relative top-[1px] self-center" />
            <p className="cursor-pointer">
              {langString == "id" ? (
                <span>Indonesia</span>
              ) : (
                <span className="relative right-4">English</span>
              )}
            </p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 mt-2 mr-3">
          <DropdownMenuLabel>
            <div className="flex space-x-4">
              <Languages className="size-4 self-center" />
              <span>Bahasa / Language</span>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={position}
            onValueChange={changeLangHandler}
          >
            <DropdownMenuRadioItem value="id">
              Bahasa Indonesia
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="en">English</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
