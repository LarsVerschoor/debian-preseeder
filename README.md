# Debian Preseeder

This project is meant to make it easier for me to install Debian onto my devices using a preseed configuration over HTTP.

I install Debian onto my devices using a USB-stick with the Debian ISO image. The ISO image contains boot parameters which makes the installer use a preseed configuration file which is hosted on the LAN by the HTTP server in this repository.

## Step 1: Configuring the preseed & starting the HTTP server

1. Install all dependencies
    ```shell
    npm install
    ```
2. Run the project and answer the configuration questions
    ```shell
    npm run start
    ```
   The HTTP server should now start automatically. 

## Step 2: Configuring the boot parameters to use the HTTP server

1. Download an official Debian Trixie ISO image.
2. Install 7-Zip
3. Extract it using 7-Zip to a directory that ends with "-amd64-netinst".
4. Open the extracted directory and edit boot/grub/grub.cfg
5. Replace `linux    /install.amd/vmlinuz vga=788 --- quiet` with `linux    /install.amd/vmlinuz auto=true priority=critical preseed/url=http://192.168.1.50:3000/preseed vga=788 --- quiet` at the `menuentry --hotkey=i 'Install' {` block.
6. You now need to rebuild the modified iso (ends with "-amd64-netinst") and write it to the USB-stick. You can do this using an image-writing tool like `Rufus` (windows) or `dd` (Linux/macOS).


sudo apt update
sudo apt install xorriso