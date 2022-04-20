<template>
  <button type="button" class="btn-close">
    <span class="icon-cross"></span>
    <span class="visually-hidden">Close</span>
  </button>
</template>

<style lang="scss">
@mixin cross($size: 20px, $color: currentColor, $thickness: 1px) {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  position: relative;
  width: $size;
  height: $size;

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: calc(($size - $thickness) / 2);
    left: 0;
    right: 0;
    height: $thickness;
    background: $color;
    border-radius: $thickness;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }

  span {
    display: block;
  }
}

.btn-close {
  margin: 0;
  border: 0;
  padding: 0;
  background: var(--primary);
  border-radius: 50%;
  width: 26px;
  height: 26px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 150ms;
  outline: none;

  .icon-cross {
    @include cross(14px, var(--background), 2px);
  }

  &:hover,
  &:focus {
    transform: rotateZ(90deg);
  }
}

// For screen readers.
.visually-hidden {
  position: absolute !important;
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0 !important;
  border: 0 !important;
  height: 1px !important;
  width: 1px !important;
  overflow: hidden;
}
</style>
