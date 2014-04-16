#!/usr/bin/perl
use strict;
use warnings;
use File::Path qw(make_path);
use File::Copy;
use File::Basename;
use File::Find;
use Path::Class;
use POSIX;
use File::Copy::Recursive qw(fcopy rcopy dircopy fmove rmove dirmove);

	my ($dir) =@ARGV;
	#= "/Users/synerzip/B2C/DAILY_DATA/fidelity/Daily_Run/TestFiles-28-June";
	my $extension = "";
	my @parts = "";
	my $fileName = "";
	opendir (DOCS, $dir) or die "[DOCS DIR] Can't open the directory [$dir]\n";
	my @files = readdir(DOCS);
	
		foreach my $doc(@files){
			if (($doc eq ".") || ($doc eq "..") || ($doc eq "Thumbs.db") || (index($doc,"DS_Store") != -1)){
				next;
			}	
			@parts = split('\\.', $doc);
			if(@parts > 1 ) {
				$extension = $parts[@parts - 1];
			}
			
			@parts = split($extension, $doc);
			if(@parts > 0 ) {
				$parts[0] = substr($parts[0], 0, -1);
				@parts = split("\/",$parts[0]);
				$fileName = $parts[@parts - 1];
				$fileName = fixFileName($fileName);
			}
			my $target_file = "$dir/".$fileName.".$extension";
			rename("$dir/$doc","$dir/$fileName.$extension");
		}
		
	sub fixFileName{
		for($_[0]){
			s/\./_/g;
			s/-/_/g;
			s/\+/_/g;
			s/\{//g;
			s/\}//g;
			s/\(//g;
			s/\)//g;
			s/\&//g;
			s/,//g;
			s/'//g;
			s/\[/_/g;
			s/\]/_/g;
			s/ /_/g;
			s/\%/_/g;
		}
	for($_[0]){
		s/___/_/g;
		s/__/_/g;
	}	
	return uc($_[0]);
}
