import {
  Avatar,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount,
} from "business-management-app";

export function Default() {
  return (
    <Avatar>
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  );
}

export function Sizes() {
  return (
    <div className="flex items-center gap-4">
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar size="default">
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  );
}

export function WithBadge() {
  return (
    <Avatar size="lg">
      <AvatarFallback>AK</AvatarFallback>
      <AvatarBadge />
    </Avatar>
  );
}

export function Team() {
  return (
    <AvatarGroup>
      <Avatar>
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>TL</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>PS</AvatarFallback>
      </Avatar>
      <AvatarGroupCount>+3</AvatarGroupCount>
    </AvatarGroup>
  );
}
